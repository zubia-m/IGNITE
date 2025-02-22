import pandas as pd
import xgboost as xgb
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report

# Load CSV files
X_train = pd.read_csv('X_train.csv')
X_test = pd.read_csv('X_test.csv')
# Load the data
y_train = pd.read_csv("y_train.csv")
y_test = pd.read_csv("y_test.csv")

# Ensure they are Series (extract the first column if they are DataFrames)
y_train = y_train.iloc[:, 0]
y_test = y_test.iloc[:, 0]

# Check the number of unique classes
num_classes = len(y_train.unique())

print(f"Number of classes: {num_classes}")

# Now you can use .unique() on y_train
num_classes = len(y_train.unique())  # Get the number of unique classes for multi-class classification

# Continue with the rest of the code...

# Apply One-Hot Encoding to categorical features
X_train = pd.get_dummies(X_train, drop_first=True)  # drop_first to avoid multicollinearity
X_test = pd.get_dummies(X_test, drop_first=True)

# Align X_train and X_test to have the same columns (in case of different categorical values in train/test)
X_train, X_test = X_train.align(X_test, join='left', axis=1, fill_value=0)

# Optionally, scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Convert to DMatrix (XGBoost's internal format)
dtrain = xgb.DMatrix(X_train_scaled, label=y_train)
dtest = xgb.DMatrix(X_test_scaled, label=y_test)

# Set up parameters for XGBoost
params = {
    'objective': 'multi:softmax',  # Multi-class classification
    'eval_metric': 'merror',  # Multi-class error rate
    'num_class': len(y_train.unique()),  # Number of unique classes
    'eta': 0.1,  # Learning rate
    'max_depth': 6,  # Max depth of trees
    'subsample': 0.8,  # Fraction of samples used for each tree
    'colsample_bytree': 0.8  # Fraction of features used for each tree
}

# Train the model
num_round = 100  # Number of boosting rounds
model = xgb.train(params, dtrain, num_round, evals=[(dtest, 'eval')], early_stopping_rounds=10)
model.save_model("xgboost_propertyType.json")  # Saves the trained model
# Make predictions
y_pred = model.predict(dtest)

# Evaluate model performance
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")
print("Classification Report:")
print(classification_report(y_test, y_pred))
