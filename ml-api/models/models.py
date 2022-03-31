import os
import pickle
from fer import Video, FER
from configs.definitions import ROOT_DIR

TEXT_MODEL = pickle.load(open("models/text_model.pkl", "rb"))
TFIDF_MODEL = pickle.load(open("models/tfidf_model.pkl", "rb"))


def detect_emotions(video_fname):
    videofile_path = os.path.join(ROOT_DIR, "data", video_fname)
    print(videofile_path)
    face_detection = FER(mtcnn=True)
    try:
        input_video = Video(videofile_path)
        processed_data = input_video.analyze(
            face_detection, display=False, frequency=15
        )
        vid_df = input_video.to_pandas(processed_data)
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
        return sum_emotions
    except OSError as exception:
        return {"errors": str(exception)}
