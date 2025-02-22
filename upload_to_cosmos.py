from azure.cosmos import CosmosClient, exceptions
import requests
import os

# Initialize Cosmos DB client
COSMOS_DB_URI = os.getenv("COSMOS_DB_URI")
COSMOS_DB_KEY = os.getenv("COSMOS_DB_KEY")
DATABASE_NAME = "RealEstateDB"
CONTAINER_NAME = "HomeListings"

cosmos_client = CosmosClient(COSMOS_DB_URI, COSMOS_DB_KEY)
container = cosmos_client.get_database_client(DATABASE_NAME).get_container_client(CONTAINER_NAME)

# API Endpoints
RENTCAST_API_KEY = os.getenv("RENTCAST_API_KEY")
PROPERTY_RECORDS_ENDPOINT = os.getenv("PROPERTY_RECORDS_ENDPOINT")
SALE_LISTINGS_ENDPOINT = os.getenv("SALE_LISTINGS_ENDPOINT")
MARKET_STATS_ENDPOINT = os.getenv("MARKET_STATS_ENDPOINT")


def fetch_data(api_endpoint):
    """ Generic function to fetch data from Realcast APIs """
    headers = {
        "X-Api-Key": RENTCAST_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    response = requests.get(api_endpoint, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print(f"❌ Error fetching data from {api_endpoint}: {response.status_code} - {response.text}")
        return []
    print(f"✅ {len(property_records)} listings fetched from Property Records API")
    print(f"✅ {len(market_stats)} listings fetched from Market Statistics API")

def merge_data(existing_doc, new_data):
    """ Merges new API data into existing document while keeping unique fields """
    for key, value in new_data.items():
        if value not in [None, "N/A", "", 0]:  # Avoid overwriting with empty values
            existing_doc[key] = value
    return existing_doc


def store_in_cosmos(listings, api_type):
    """ Inserts or updates documents in Cosmos DB """
    for listing in listings:
        doc_id = listing.get("id", "N/A")
        city = listing.get("city", "N/A")

        try:
            # Check if document exists
            existing_doc = container.read_item(item=doc_id, partition_key=city)
            print(f"🔄 Updating existing listing {doc_id}")
            updated_doc = merge_data(existing_doc, listing)
        except exceptions.CosmosResourceNotFoundError:
            print(f"🆕 Creating new listing {doc_id}")
            updated_doc = listing  # No existing document, so use the new one

        # Insert or update the document
        try:
            container.upsert_item(updated_doc)
            print(f"✅ Successfully stored {api_type} data for listing {doc_id}")
        except Exception as e:
            print(f"❌ Error storing {api_type} data for listing {doc_id}: {e}")


if __name__ == "__main__":
    # Fetch data from all APIs
    property_records = fetch_data(PROPERTY_RECORDS_ENDPOINT)
    sale_listings = fetch_data(SALE_LISTINGS_ENDPOINT)
    market_stats = fetch_data(MARKET_STATS_ENDPOINT)

    # Store in Cosmos DB
    if property_records:
        store_in_cosmos(property_records, "Property Records")
    if sale_listings:
        store_in_cosmos(sale_listings, "Sale Listings")
    if market_stats:
        store_in_cosmos(market_stats, "Market Statistics")
