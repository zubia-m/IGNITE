from azure.cosmos import CosmosClient, PartitionKey, exceptions
import requests
import os

# Initialize Cosmos DB client
COSMOS_DB_URI = os.getenv("COSMOS_DB_URI")
COSMOS_DB_KEY = os.getenv("COSMOS_DB_KEY")
DATABASE_NAME = "RealEstateDB"
CONTAINER_NAME = "HomeListings"

cosmos_client = CosmosClient(COSMOS_DB_URI, COSMOS_DB_KEY)

# Fetch data from the Realcast API
REALCAST_ENDPOINT = os.getenv("REALCAST_ENDPOINT")  # Update with actual API endpoint
API_KEY = os.getenv("REALCAST_API_KEY")


def fetch_real_estate_data():
    headers = {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    response = requests.get(REALCAST_ENDPOINT, headers=headers)

    if response.status_code == 200:
        data = response.json()
        print(f"✅ Successfully fetched {len(data)} listings.")
        return data
    else:
        print(f"❌ Error fetching data: {response.status_code} - {response.text}")
        return []


def store_in_cosmos(data):
    container = cosmos_client.get_database_client(DATABASE_NAME).get_container_client(CONTAINER_NAME)

    for listing in data:
        # Safely handle None values by using `.get()` method
        document = {
            "id": listing.get('id', 'N/A'),  # Unique identifier
            "city": listing.get('city', 'N/A'),  # Partition key
            "formattedAddress": listing.get('formattedAddress', 'N/A'),
            "addressLine1": listing.get('addressLine1', 'N/A'),
            "addressLine2": listing.get('addressLine2', 'N/A'),
            "state": listing.get('state', 'N/A'),
            "zipCode": listing.get('zipCode', 'N/A'),
            "county": listing.get('county', 'N/A'),
            "latitude": listing.get('latitude', 0.0),
            "longitude": listing.get('longitude', 0.0),
            "propertyType": listing.get('propertyType', 'N/A'),
            "bedrooms": listing.get('bedrooms', 0),
            "bathrooms": listing.get('bathrooms', 0),
            "squareFootage": listing.get('squareFootage', 0),
            "yearBuilt": listing.get('yearBuilt', 0),
            "assessorID": listing.get('assessorID', 'N/A'),
            "features": listing.get('features', {})
        }

        # Insert the document into the Cosmos DB container
        try:
            container.upsert_item(document)  # Insert or update the document
            print(f"✅ Successfully inserted listing {listing['id']}")
        except exceptions.CosmosResourceNotFoundError as e:
            print(f"❌ Error inserting listing {listing.get('id', 'Unknown')}: {e}")
        except Exception as e:
            print(f"❌ Error inserting listing {listing.get('id', 'Unknown')}: {e}")


if __name__ == "__main__":
    # Fetch the data
    listings = fetch_real_estate_data()

    # If data is fetched, store it in Cosmos DB
    if listings:
        store_in_cosmos(listings)
