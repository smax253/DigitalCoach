"""
Main Flask application as well as routes of the app.
"""
import uuid
from flask import Flask, jsonify, request
from helpers.download_url import download_video_link
from helpers.score import create_answer

# initalize the Flask object
app = Flask(__name__)


@app.route("/predict", methods=["POST"])
def predict():
    """
    POST route that returns total text, audio and video predictions.
    """
    # req = request.get_json()
    # video_url = content["video_url"]
    # if not video_url:
    #     return jsonify(errors="Required video url link not in request body.")
    # download = download_video_link(video_url)
    # if "errors" in download:
    #     return jsonify(message="Download failed.", errors=download["errors"])
    content = {"fname": "video.mov", "rename": str(uuid.uuid4()) + ".mp3"}
    result = create_answer(content)
    return result


@app.route("/", methods=["GET"])
def index():
    """
    Home route.
    """
    return "Welcome to the ML API for Digital Coach"


if __name__ == "___main__":
    app.run(debug=True, threaded=False, host="0.0.0.0")
