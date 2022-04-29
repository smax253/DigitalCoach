import numpy as np
from helpers.av_processing import build_timeline_interval_facial
from heapq import nlargest
from configs.rubric import (
    AUDIO_EMOTION_POINTS,
    AV_ASSOCIATIONS,
    FACIAL_EMOTION_POINTS,
    OVERAL_FACIAL_POINTS,
    OVERALL_AUDIO_POINTS,
)


def calculate_overall_facial_sentiment(facial_data):
    emotion_sums = dict(facial_data["emotion_sums"])
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
    if len(top_three) < 3:
        iterations = 3 - len(top_three)
        for _ in range(iterations):
            top_three.append("N/A")
        fdist["N/A"] = 0.0
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


def _compute_av_sentiment_matches(timeline):
    total_pts = len(timeline) * 2
    pts = 0
    for entry in timeline:
        if (
            entry["facialEmotion"][0] in AV_ASSOCIATIONS[entry["audioSentiment"]]
            and entry["facialEmotion"][1] in AV_ASSOCIATIONS[entry["audioSentiment"]]
        ):
            pts += 2
        elif (
            entry["facialEmotion"][0] in AV_ASSOCIATIONS[entry["audioSentiment"]]
            and entry["facialEmotion"][1]
            not in AV_ASSOCIATIONS[entry["audioSentiment"]]
        ):
            pts += 1
        elif (
            entry["facialEmotion"][0] not in AV_ASSOCIATIONS[entry["audioSentiment"]]
            and entry["facialEmotion"][1] in AV_ASSOCIATIONS[entry["audioSentiment"]]
        ):
            pts += 1
        else:
            continue
    av_matches = (pts / total_pts) * 30
    return av_matches


def _compute_pts_for_emotion_occurences(timeline):
    total_pts = len(timeline) * 6
    pts = 0
    for entry in timeline:
        pts += AUDIO_EMOTION_POINTS[entry["audioSentiment"]]
        pts += (
            FACIAL_EMOTION_POINTS[entry["facialEmotion"][0]]
            + FACIAL_EMOTION_POINTS[entry["facialEmotion"][1]]
        )

    if pts <= 0:
        return 0
    return (pts / total_pts) * 10


def compute_aggregate_score(result):
    text_score = result["isStructuredPercent"] * 40
    overall_facial = OVERAL_FACIAL_POINTS[result["overallFacialEmotion"]]
    overall_audio = OVERALL_AUDIO_POINTS[result["overallSentiment"]]
    av_matches = _compute_av_sentiment_matches(result["timeline"])
    emotion_occurences = _compute_pts_for_emotion_occurences(result["timeline"])
    print(text_score, overall_facial, overall_audio, av_matches, emotion_occurences)
    aggregate = (
        text_score + overall_facial + overall_audio + av_matches + emotion_occurences
    )
    return round(aggregate, 2)
