from flask import Flask, jsonify
from flask_cors import CORS
from classifier.classifier import get_prediction

app = Flask(__name__)
# double-check
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/classify", methods=["GET"])
def classify():

    results = get_prediction()
    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
