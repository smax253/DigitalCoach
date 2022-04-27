"""
Main Flask application as well as routes of the app.
"""
import uuid
import redis
from rq import Queue
from flask import Flask, jsonify, request
from helpers.download_url import download_video_link
from helpers.score import create_answer

# initalize the Flask object
app = Flask(__name__)
r = redis.Redis()
q = Queue(connection=r)


@app.route("/predict", methods=["POST"])
def predict():
    """
    POST route that returns total text, audio and video predictions.
    """
    # req = request.get_json()
    # video_url = content["videoUrl"]
    # if not video_url:
    #     return jsonify(errors="Required video url link not in request body.")
    # download = download_video_link(video_url)
    # if "errors" in download:
    #     return jsonify(message="Download failed.", errors=download["errors"])
    content = {"fname": "video.mov", "rename": str(uuid.uuid4()) + ".mp3"}
    job = q.enqueue(create_answer, content)
    message = "Task " + str(job.id) + " added to queue at " + str(job.enqueued_at) + "."
    return jsonify(message=message)


@app.route("/", methods=["GET"])
def index():
    """
    Home route.
    """
    return "Welcome to the ML API for Digital Coach"


if __name__ == "___main__":
    app.run(debug=True, threaded=False, host="0.0.0.0")
