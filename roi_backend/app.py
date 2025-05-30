from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows frontend access from React

# Load trained model
model = joblib.load('roi_model.pkl')

# Define required input fields (same as training features)
FEATURES = ['Current Price', '2020 Price', '2021 Price', '2022 Price', '2023 Price', '2024 Price', 'Est. Monthly Rent', 'Type of House']

@app.route('/predict-roi', methods=['POST'])
def predict_roi():
    data = request.json
    try:
        # Ensure all required fields are present
        if not all(field in data for field in FEATURES):
            return jsonify({'error': 'Missing one or more input fields'}), 400

        # Convert categorical 'Type of House' to numeric encoding
        type_mapping = {'Apartment': 0, 'Townhouse': 1, 'Villa': 2}  # Modify as per your training data
        house_type_encoded = type_mapping.get(data['Type of House'], 0)

        # Construct input array
        input_data = np.array([
            float(data['Current Price']),
            float(data['2020 Price']),
            float(data['2021 Price']),
            float(data['2022 Price']),
            float(data['2023 Price']),
            float(data['2024 Price']),
            float(data['Est. Monthly Rent']),
            house_type_encoded
        ]).reshape(1, -1)

        # Predict ROI
        prediction = model.predict(input_data)[0]
        return jsonify({'predicted_roi': round(prediction, 2)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)