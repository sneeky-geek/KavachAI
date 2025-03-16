from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

import numpy as np

app = Flask(__name__)
CORS(app)

# Load your model
with open('kavachai_model.pkl', 'rb') as f:
    model = joblib.load(f)

# Load your label encoder
with open('label_encoder.pkl', 'rb') as f:
    label_encoder = joblib.load(f)

@app.route('/')
def home():
    return 'KavachAI Flask API is running!'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from the request
        data = request.get_json()
        if data is None:
            return jsonify({'error': 'No JSON data provided'}), 400

        # Extract features
        features = data.get('features')
        if not isinstance(features, list):
            return jsonify({'error': 'features must be a list'}), 400
        if len(features) != 5:
            return jsonify({'error': 'expected 5 features'}), 400
        if not all(isinstance(f, (int, float)) for f in features):
            return jsonify({'error': 'all features must be numbers'}), 400

        # Debug: Print received features
        print("Received features:", features)
        print("Feature types:", [type(f) for f in features])

        # Convert to NumPy array and reshape to (1, 5) for scikit-learn
        features_array = np.array([features], dtype=float)
        print("Features array shape:", features_array.shape)

        # Make prediction
        prediction = model.predict(features_array)
        predicted_label = label_encoder.inverse_transform([prediction[0]])[0]

        return jsonify({'prediction': predicted_label})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)