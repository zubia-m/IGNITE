import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Load and clean data
df = pd.read_csv('roi data.csv')

def clean_currency(x):
    return float(str(x).replace('$', '').replace(',', '').replace('(est)', '').strip())

def clean_percent(x):
    return float(str(x).replace('%', '').strip())

# Apply cleaning
price_columns = ['Current Price', '2020 Price', '2021 Price', '2022 Price', '2023 Price', '2024 Price']
for col in price_columns:
    df[col] = df[col].apply(clean_currency)

df['Est. Monthly Rent'] = df['Est. Monthly Rent'].apply(lambda x: clean_currency(x) if pd.notnull(x) else 0)
df['ROI Prediction (%)'] = df['ROI Prediction (%)'].apply(clean_percent)

# Encode categorical columns
df['Type of House'] = df['Type of House'].astype('category').cat.codes

# Features and Target
features = price_columns + ['Est. Monthly Rent', 'Type of House']
X = df[features]
y = df['ROI Prediction (%)']

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
print("R^2 Score:", r2_score(y_test, y_pred))
print("MSE:", mean_squared_error(y_test, y_pred))

# Save model
joblib.dump(model, 'roi_model.pkl')
print("Model saved as roi_model.pkl")