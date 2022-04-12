"""
Main Flask application as well as routes of the app.
"""
from flask import Flask, jsonify, request
from helpers.text_processor import clean_text
from helpers.text_predict import predict_text_structure
from helpers.av_processing import extract_audio, av_timeline_resolution
from helpers.file_management import move_cv_files
from models.models import detect_emotions, detect_audio_sentiment
from helpers.statistics import (
    calculate_top_three_facial_with_count,
    calculate_overall_audio_sentiment,
    grab_top_five_keywords,
)

# initalize the Flask object
app = Flask(__name__)


def score_text_structure(content):
    """
    score how structured the user's answers are.
    """
    if "answer" not in content:
        return jsonify(errors="Text to predict does not exist.")
    text = content["answer"]
    cleaned = clean_text(text)
    predictions = predict_text_structure(cleaned)
    return jsonify(percent_prediction=predictions[0], binary_prediction=predictions[1])


def score_audio(content):
    """
    score user's audio.
    """
    if "fname" not in content or "rename" not in content:
        return jsonify(errors="File name and rename does not exist.")
    fname, rename = content["fname"], content["rename"]
    audio = extract_audio(fname, rename)
    if "errors" in audio:
        return jsonify(errors=audio["errors"])
    audio_file_path = audio["path_to_file"]
    sentiment = detect_audio_sentiment(audio_file_path)
    sentiment["clip_length_seconds"] = audio["clip_length_seconds"]
    if "errors" in sentiment:
        return jsonify(errors=sentiment["errors"])
    return sentiment


def score_facial(content):
    """
    score user's facial expressions
    """
    if "fname" not in content:
        return jsonify(errors="Video file name does not exist.")
    video_fname = content["fname"]
    total_emotion_score = detect_emotions(video_fname)
    move_cv_files()
    if "errors" in total_emotion_score:
        return jsonify(total_emotion_score)
    return jsonify(total_emotion_score)


@app.route("/predict", methods=["POST"])
def score():
    """
    POST route that returns total text, audio and video predictions.
    """
    content = request.get_json()
    fname, rename, answer = content["fname"], content["rename"], content["answer"]
    if not fname or not rename or not answer:
        return jsonify(errors="Request body does not have all required fields.")
    text_answer = score_text_structure(content)
    facial_answer = score_facial(content)
    audio_answer = score_audio(content)
    timeline = av_timeline_resolution(
        audio_answer["clip_length_seconds"], facial_answer, audio_answer["sentiments"]
    )
    (
        facial_stats,
        top_stat,
        second_stat,
        third_stat,
    ) = calculate_top_three_facial_with_count(facial_answer)
    result = {
        "timeline": timeline,
        "isStructured": text_answer["binary_prediction"],
        "isStructuredPercent": text_answer["percent_prediction"],
        "aggregateScore": 0,
        "facialStatistics": {
            "topThreeEmotions": facial_stats,
            "frequencyOfTopEmotion": top_stat,
            "frequencyOfSecondEmotion": second_stat,
            "frequencyOfThirdEmotion": third_stat,
        },
        "overallFacialEmotion": facial_stats[0],
        "overallSentiment": calculate_overall_audio_sentiment(audio_answer),
        "topFiveKeywords": grab_top_five_keywords(audio_answer),
    }
    return result


@app.route("/", methods=["GET"])
def index():
    """
    Home route.
    """
    return "Welcome to the ML API for Digital Coach"


if __name__ == "___main__":
    app.run(debug=True, host="0.0.0.0")
