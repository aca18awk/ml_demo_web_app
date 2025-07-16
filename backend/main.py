from flask import Flask, jsonify, request
from flask_cors import CORS
from classifier.classifier import get_prediction
import os
import tempfile

app = Flask(__name__)
# double-check
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/classify", methods=["POST"])
def classify():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No image file selected'}), 400

    # Save the uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_file:
        file.save(temp_file.name)
        temp_path = temp_file.name

    try:
        # Get prediction using the uploaded image
        results = get_prediction(input_file=temp_path)
        return jsonify(results)
    finally:
        # Clean up the temporary file
        if os.path.exists(temp_path):
            os.unlink(temp_path)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
