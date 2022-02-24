from flask import Flask, jsonify, request
from helpers.text_processor import clean_text
from helpers.text_predict import predict_text_structure

# initalize the Flask object
app = Flask(__name__)

"""
POST request with a text option within the text body 
that has to get processed and then fed into the model.
"""


@app.route("/predict-text", methods=["POST"])
def score_text_structure():
    content = request.get_json()
    if not content["answer"]:
        return "Text to predict does not exist."
    text = content["answer"]
    cleaned = clean_text(text)
    predictions = predict_text_structure(cleaned)
    return jsonify(percent_prediction=predictions[0], binary_prediction=predictions[1])


@app.route("/", methods=["GET"])
def index():
    return "Welcome to the ML API for Digital Coach"


if __name__ == "___main__":
    app.run(debug=True, host="0.0.0.0")
