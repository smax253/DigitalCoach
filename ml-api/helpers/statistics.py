import numpy as np
from helpers.av_processing import build_timeline_interval_facial
from heapq import nlargest


def calculate_overall_facial_sentiment(facial_data):
    emotion_sums = dict(facial_data.json["emotion_sums"])
    return max(emotion_sums, key=lambda key: emotion_sums[key])


def calculate_overall_audio_sentiment(audio_data):
    sentiments = audio_data["sentiment_analysis"]
    sent_list = [i["sentiment"] for i in sentiments]
    counted_sents = max(set(sent_list), key=sent_list.count)
    return counted_sents


def grab_top_five_keywords(audio_data):
    keywords = audio_data["highlights"]["results"]
    top_five = nlargest(5, keywords, key=lambda item: item["rank"])
    return top_five


def calculate_top_three_facial_with_count(facial_data):
    timeline_interval = build_timeline_interval_facial(facial_data)
    emotions_per_interval = list(timeline_interval.values())
    fdist = dict(zip(*np.unique(emotions_per_interval, return_counts=True)))
    top_three = sorted(fdist, key=fdist.get, reverse=True)[:3]
    top_three_with_count = [
        (top_three[0], fdist[top_three[0]]),
        (top_three[1], fdist[top_three[1]]),
        (top_three[2], fdist[top_three[2]]),
    ]
    denominator = (
        top_three_with_count[0][1]
        + top_three_with_count[1][1]
        + top_three_with_count[2][1]
    )
    top_stat = top_three_with_count[0][1] / denominator
    second_stat = top_three_with_count[1][1] / denominator
    third_stat = top_three_with_count[2][1] / denominator
    return top_three, top_stat, second_stat, third_stat
