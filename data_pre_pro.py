import os
import pandas as pd
from azure.cosmos import CosmosClient
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Azure Cosmos DB credentials
COSMOS_DB_URI = os.getenv("COSMOS_DB_URI")
COSMOS_DB_KEY = os.getenv("COSMOS_DB_KEY")
DATABASE_NAME = "RealEstateDB"
CONTAINER_NAME = "HomeListings"

# Initialize Cosmos DB client
cosmos_client = CosmosClient(COSMOS_DB_URI, COSMOS_DB_KEY)
container = cosmos_client.get_database_client(DATABASE_NAME).get_container_client(CONTAINER_NAME)


def fetch_data():
    """Fetches real estate data from Cosmos DB and returns as a Pandas DataFrame."""
    query = "SELECT * FROM c"
    items = list(container.query_items(query=query, enable_cross_partition_query=True))

    if not items:
        print("❌ No data found in Cosmos DB.")
        return None

    df = pd.DataFrame(items)
    print(f"✅ Successfully fetched {len(df)} records from Cosmos DB.")
    return df


def clean_data(df):
    """Handles missing values and encodes categorical features."""

    # Drop unnecessary columns
    drop_cols = ["id", "_rid", "_self", "_etag", "_attachments", "_ts"]
    df = df.drop(columns=[col for col in drop_cols if col in df.columns], errors="ignore")

    # Fill missing values
    df.fillna({
        "bedrooms": 0,
        "bathrooms": 0,
        "squareFootage": df["squareFootage"].median() if "squareFootage" in df else 0,
        "yearBuilt": df["yearBuilt"].median() if "yearBuilt" in df else 0
    }, inplace=True)

    # Encode categorical variables
    categorical_columns = ["city", "state", "county", "propertyType"]
    for col in categorical_columns:
        if col in df.columns:
            df[col] = LabelEncoder().fit_transform(df[col].astype(str))

    print("✅ Data cleaned and categorical features encoded.")
    return df


def scale_data(df):
    """Scales numerical features for better model performance."""

    numerical_cols = ["bedrooms", "bathrooms", "squareFootage", "yearBuilt", "latitude", "longitude"]
    scaler = StandardScaler()

    df[numerical_cols] = scaler.fit_transform(df[numerical_cols])

    print("✅ Data scaled successfully.")
    return df


def split_data(df):
    """Splits the data into training and testing sets."""

    target_column = "propertyType"  # Assuming 'propertyType' is the target variable
    if target_column not in df.columns:
        print("❌ Target variable 'propertyType' not found in dataset.")
        return None, None, None, None

    X = df.drop(columns=[target_column])
    y = df[target_column]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print(f"✅ Data split: {len(X_train)} train samples, {len(X_test)} test samples.")
    return X_train, X_test, y_train, y_test


if __name__ == "__main__":
    df = fetch_data()
    if df is not None:
        df = clean_data(df)
        df = scale_data(df)
        X_train, X_test, y_train, y_test = split_data(df)

        # Save processed data for training
        X_train.to_csv("X_train.csv", index=False)
        X_test.to_csv("X_test.csv", index=False)
        y_train.to_csv("y_train.csv", index=False)
        y_test.to_csv("y_test.csv", index=False)

        print("✅ Preprocessed data saved successfully.")
