import os
import time
import pickle
import requests
from fer import Video, FER
from dotenv import load_dotenv
from configs.definitions import ROOT_DIR
from helpers.av_processing import read_audio_file

TEXT_MODEL = pickle.load(open("models/text_model.pkl", "rb"))
TFIDF_MODEL = pickle.load(open("models/tfidf_model.pkl", "rb"))

env_path = os.path.join(ROOT_DIR, ".env")
load_dotenv(env_path)


def detect_emotions(video_fname, freq=10):
    videofile_path = os.path.join(ROOT_DIR, "data", video_fname)
    face_detection = FER(mtcnn=True)
    try:
        input_video = Video(videofile_path)
        processed_data = input_video.analyze(
            face_detection, display=False, frequency=freq
        )
        vid_df = input_video.to_pandas(processed_data)
        vid_df = input_video.get_first_face(vid_df)
        vid_df = input_video.get_emotions(vid_df)
        sum_emotions = {
            "angry": sum(vid_df.angry),
            "disgust": sum(vid_df.disgust),
            "fear": sum(vid_df.fear),
            "happy": sum(vid_df.happy),
            "sad": sum(vid_df.sad),
            "surprise": sum(vid_df.surprise),
            "neutral": sum(vid_df.neutral),
        }
        timelines = {
            "angry": list(vid_df.loc[:, "angry"]),
            "disgust": list(vid_df.loc[:, "disgust"]),
            "fear": list(vid_df.loc[:, "fear"]),
            "happy": list(vid_df.loc[:, "happy"]),
            "sad": list(vid_df.loc[:, "sad"]),
            "surprise": list(vid_df.loc[:, "surprise"]),
            "neutral": list(vid_df.loc[:, "neutral"]),
        }
        response = {
            "frame_inference_rate": freq,
            "emotion_sums": sum_emotions,
            "timeline": timelines,
        }
        return response
    except OSError as exception:
        return {"errors": str(exception)}


def detect_audio_sentiment(fname):
    headers = {
        "authorization": os.getenv("AAPI_KEY"),
        "content-type": "application/json",
    }
    res_upload = requests.post(
        os.getenv("UPLOAD_ENDPOINT"), headers=headers, data=read_audio_file(fname)
    )

    upload_url = res_upload.json()["upload_url"]

    res_transcript = requests.post(
        os.getenv("TRANSCRIPT_ENDPOINT"),
        headers=headers,
        json={
            "audio_url": upload_url,
            "sentiment_analysis": True,
            "auto_highlights": True,
            "iab_categories": True,
        },
    )

    transcript_id = res_transcript.json()["id"]

    polling_endpoint = os.path.join(os.getenv("TRANSCRIPT_ENDPOINT"), transcript_id)

    status = ""
    while status != "completed":
        response_result = requests.get(polling_endpoint, headers=headers)
        status = response_result.json()["status"]
        print(f"Status: {status}")

        if status == "error":
            print("Error reached!")
            return {"errors": "Status error reached"}
        elif status != "completed":
            time.sleep(10)

    if status == "completed":
        sentiment_results = response_result.json()["sentiment_analysis_results"]
        highlights_results = response_result.json()["auto_highlights_result"]
        iab_results = response_result.json()["iab_categories_result"]
        response = {
            "sentiment_analysis": sentiment_results,
            "highlights": highlights_results,
            "iab_results": iab_results,
        }

        return response
