import os
import math
import moviepy.editor as mp
import pandas as pd
from configs.definitions import ROOT_DIR


def _build_timeline_intervals_sentiment(sent_analysis_lst):
    """
    Iterates through the sentiment analysis list from the
    AssemblyAI Audio results to construct a list of lists
    in which the inner list corresponds to the format of
    [start_in_ms, end_in_ms, audio_sentiment_of_interval]
    """
    timeline = []
    for k in sent_analysis_lst:
        interval = [k["start"], k["end"], k["sentiment"]]
        timeline.append(interval)
    timeline.sort(key=lambda x: x[0])
    return timeline


def build_timeline_interval_facial(facial_data):
    """
    Builds the facial data timeline.
    """
    df = pd.DataFrame(data=facial_data["timeline"])
    max_val_index = df.idxmax(axis=1)
    emotion_per_frame = [i for i in max_val_index]
    facial_timeline = {
        k: v
        for k, v in zip(list(range(facial_data["total_frames"])), emotion_per_frame)
    }
    return facial_timeline


def _emotion_sentiment_match(start, end, interval_length, facial_timeline):
    return [
        facial_timeline[start // interval_length],
        facial_timeline[end // interval_length],
    ]


def av_timeline_resolution(clip_length, facial_data, audio_sentiments):
    total_frames = facial_data["total_frames"]
    fps = int(math.ceil(total_frames / clip_length))
    interval_length = 1000 // fps
    audio_timeline = _build_timeline_intervals_sentiment(audio_sentiments)
    facial_timeline = build_timeline_interval_facial(facial_data)
    timeline = []
    for stats in audio_timeline:
        entry = {
            "start": stats[0],
            "end": stats[1],
            "audioSentiment": stats[2],
            "facialEmotion": _emotion_sentiment_match(
                stats[0], stats[1], interval_length, facial_timeline
            ),
        }
        timeline.append(entry)

    return timeline


def extract_audio(fname, des_fname):
    path = os.path.join(ROOT_DIR, "data", fname)
    des_path = os.path.join(ROOT_DIR, "data", des_fname)
    try:
        mv_clip = mp.VideoFileClip(path)
        mv_clip.audio.write_audiofile(des_path)
        return {
            "path_to_file": str(des_path),
            "clip_length_seconds": mv_clip.duration,
        }
    except OSError as exception:
        return {"errors": str(exception)}


def read_audio_file(file_path):
    with open(file_path, "rb") as f:
        while True:
            data = f.read(5242880)
            if not data:
                break
            yield data
