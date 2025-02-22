import json
import requests
from azure.cosmos import CosmosClient, exceptions
import os

# Initialize Cosmos DB client
COSMOS_DB_URI = os.getenv("COSMOS_DB_URI")
COSMOS_DB_KEY = os.getenv("COSMOS_DB_KEY")
DATABASE_NAME = "RealEstateDB"
CONTAINER_NAME = "HomeListings"

cosmos_client = CosmosClient(COSMOS_DB_URI, COSMOS_DB_KEY)

# Fetch data from the Realcast API
SALE_LISTINGS_ENDPOINT = os.getenv("SALE_LISTINGS_ENDPOINT")  # Update with actual API endpoint
API_KEY = os.getenv("REALCAST_API_KEY")


def fetch_data(api_endpoint):
    headers = {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    response = requests.get(api_endpoint, headers=headers)
    if response.status_code == 200:
        return response.json()  # Parsing JSON directly here
    else:
        print(f"❌ Error fetching data: {response.status_code} - {response.text}")
        return []


def store_in_cosmos(data, api_type):
    container = cosmos_client.get_database_client(DATABASE_NAME).get_container_client(CONTAINER_NAME)

    # Loop through listings and upsert them into Cosmos DB
    for listing in data:
        try:
            # Assuming `listing` is a dictionary after JSON parsing
            doc_id = listing.get("id", "N/A")
            city = listing.get("city", "N/A")
            formatted_address = listing.get("formattedAddress", "N/A")
            price = listing.get("price", "N/A")

            document = {
                "id": doc_id,
                "city": city,
                "formattedAddress": formatted_address,
                "price": price,
                "api_type": api_type  # Store the API type for tracking
            }

            # Insert or update the document in Cosmos DB
            container.upsert_item(document)
            print(f"✅ Successfully inserted listing {doc_id}")
        except Exception as e:
            print(f"❌ Error inserting listing {listing.get('id', 'Unknown')}: {e}")


if __name__ == "__main__":
    # Fetch the data from the Sale Listings API
    sale_listings = fetch_data(SALE_LISTINGS_ENDPOINT)

    # Store data in Cosmos DB
    if sale_listings:
        store_in_cosmos(sale_listings, "Sale Listings")
