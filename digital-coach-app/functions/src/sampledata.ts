const sampleAPIResponse = {
  aggregateScore: 0,
  facialStatistics: {
    frequencyOfSecondEmotion: 0.05714285714285714,
    frequencyOfThirdEmotion: 0.02857142857142857,
    frequencyOfTopEmotion: 0.9142857142857143,
    topThreeEmotions: ["neutral", "surprise", "fear"],
  },
  isStructured: 1,
  isStructuredPercent: 0.664770479416352,
  overallFacialEmotion: "neutral",
  overallSentiment: "NEUTRAL",
  timeline: [
    {
      audioSentiment: "NEUTRAL",
      end: 2158,
      facialEmotion: ["surprise", "neutral"],
      start: 430,
    },
    {
      audioSentiment: "POSITIVE",
      end: 7042,
      facialEmotion: ["neutral", "neutral"],
      start: 2194,
    },
    {
      audioSentiment: "NEUTRAL",
      end: 7290,
      facialEmotion: ["neutral", "neutral"],
      start: 7066,
    },
    {
      audioSentiment: "NEUTRAL",
      end: 8070,
      facialEmotion: ["neutral", "neutral"],
      start: 7340,
    },
    {
      audioSentiment: "NEUTRAL",
      end: 10650,
      facialEmotion: ["surprise", "neutral"],
      start: 8450,
    },
    {
      audioSentiment: "NEGATIVE",
      end: 14694,
      facialEmotion: ["neutral", "fear"],
      start: 10760,
    },
    {
      audioSentiment: "POSITIVE",
      end: 19700,
      facialEmotion: ["fear", "neutral"],
      start: 14852,
    },
    {
      audioSentiment: "NEUTRAL",
      end: 22362,
      facialEmotion: ["neutral", "neutral"],
      start: 21290,
    },
    {
      audioSentiment: "NEGATIVE",
      end: 23160,
      facialEmotion: ["neutral", "neutral"],
      start: 22436,
    },
  ],
  topFiveKeywords: [
    {
      count: 1,
      rank: 0.15,
      text: "computer science knowledge",
      timestamps: [{ end: 18682, start: 17840 }],
    },
    {
      count: 2,
      rank: 0.14,
      text: "computer science",
      timestamps: [
        { end: 5578, start: 4786 },
        { end: 18418, start: 17840 },
      ],
    },
    {
      count: 1,
      rank: 0.11,
      text: "Stevens Institute",
      timestamps: [{ end: 3922, start: 3356 }],
    },
    {
      count: 1,
      rank: 0.11,
      text: "Google technology",
      timestamps: [{ end: 19700, start: 18836 }],
    },
    {
      count: 1,
      rank: 0.09,
      text: "Hamsunasami",
      timestamps: [{ end: 2158, start: 1376 }],
    },
  ],
};

export default sampleAPIResponse;
