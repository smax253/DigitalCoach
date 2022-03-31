"""
Main Flask application as well as routes of the app.
"""
from flask import Flask, jsonify, request
from helpers.text_processor import clean_text
from helpers.text_predict import predict_text_structure
from helpers.av_processing import extract_audio 
# initalize the Flask object
app = Flask(__name__)


@app.route("/predict-text", methods=["POST"])
def score_text_structure():
    """
    POST route to score how structured the user's answers are.
    """
    content = request.get_json()
    if not content["answer"]:
        return jsonify(errors="Text to predict does not exist.")
    text = content["answer"]
    cleaned = clean_text(text)
    predictions = predict_text_structure(cleaned)
    return jsonify(percent_prediction=predictions[0], binary_prediction=predictions[1])


@app.route("/predict-audio", methods=["POST"])
def score_audio():
    """
    POST route to score user's facial expressions.
    """
    return jsonify(extract_audio('sample.mov', 'new_audio.mp3'))
    # if "file" not in request.files:
    #     return jsonify(errors="No video provided.")
    # video = request.files.get("file")
    # if not video:
    #     return jsonify(errors="Error grabbing video from request.")
    # path = "/"
    


@app.route("/", methods=["GET"])
def index():
    """
    Home route.
    """
    return "Welcome to the ML API for Digital Coach"


if __name__ == "___main__":
    app.run(debug=True, host="0.0.0.0")
