from azure.storage.blob import BlobServiceClient
import os
import pandas as pd

# Set Azure Storage account details
AZURE_STORAGE_CONNECTION_STRING = os.getenv("AZURE_STORAGE_CONNECTION_STRING")
CONTAINER_NAME = "redfindata"  # Your container name
BLOB_NAME = "redfin_data.csv"  # Change to the actual filename in Blob Storage
LOCAL_CSV_PATH = "downloaded_redfin_data.csv"  # Temporary local storage

def fetch_csv_from_blob():
    try:
        # Create Blob Service Client
        blob_service_client = BlobServiceClient.from_connection_string(AZURE_STORAGE_CONNECTION_STRING)
        blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=BLOB_NAME)

        # Download the CSV file
        with open(LOCAL_CSV_PATH, "wb") as file:
            file.write(blob_client.download_blob().readall())

        print(f"✅ Successfully downloaded {BLOB_NAME} from Blob Storage.")

        # Read CSV into Pandas DataFrame
        df = pd.read_csv(LOCAL_CSV_PATH)
        print(f"✅ Successfully loaded CSV into DataFrame with {len(df)} rows.")

        return df

    except Exception as e:
        print(f"❌ Error fetching CSV: {e}")
        return None

if __name__ == "__main__":
    df = fetch_csv_from_blob()

    if df is not None:
        print(df.head())  # Display first 5 rows

