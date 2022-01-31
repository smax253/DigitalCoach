import csv
from lib2to3.pytree import NegatedPattern
import math
from gensim.models import Word2Vec
import multiprocessing
from pprint import pprint
from copy import deepcopy
import pandas as pd
import numpy as np

transcript = open("parsed_transcript.csv", "r", newline="", encoding="utf-8")
scores = open("scores.csv", "r", newline="", encoding="utf-8")
scoresReader = csv.reader(scores)
scoresLines = list(scoresReader)
#rint(scoresLines)
reader = csv.reader(transcript)
scores = []
leadershipAnswers = []
for line in reader:
    answer = []
    index = 0
    while("leader" not in line[index]):
        index += 1
    index += 1
    while(index < len(line)):
        if(line[index].startswith("Interviewer")):
            if("?" in line[index]):
                break
            index+=1
            continue
        else:
            answer.append(line[index].replace("Interviewee:", ""))
        index += 1
    ID = line[0]
    for scoreLine in scoresLines:
        if(scoreLine[0] == ID and scoreLine[1] == "AGGR"):
            scores.append(math.floor(float(scoreLine[2])))
    leadershipAnswers.append(" ".join(answer))
#print(leadershipAnswers)
leadershipAnswers = list(map(lambda x: list(map(lambda y: list(filter(lambda z: len(z) > 0, y.split(" "))), x.split("."))), leadershipAnswers))
leadershipAnswers = list(map(lambda x: list(filter(lambda y: len(y) > 0, x)), leadershipAnswers))


trainingAnswers = leadershipAnswers[:len(leadershipAnswers)*3//4]
trainingScores = scores[:len(scores)*3//4]
scoreRange = [3,4,5,6]
#print(leadershipAnswers)

basemodel = Word2Vec(workers = multiprocessing.cpu_count(), epochs=3, hs=1, negative=0)
def flatten(l):
    return [item for sublist in l for item in sublist]
baseVocab = flatten(trainingAnswers)
#print(baseVocab)
basemodel.build_vocab(baseVocab)

starmodels = [deepcopy(basemodel) for i in range(len(scoreRange))]
for i in range(len(scoreRange)):
    slist = list(filter(lambda x: x[1] == scoreRange[i], zip(trainingAnswers, trainingScores)))
    slist = list(map(lambda x: x[0], slist))
    #scoreRange[i] == 3 and print(scoreRange[i], slist)
    
    slist = flatten(slist)
    
    starmodels[i].train(slist, total_examples=len(slist), epochs=10)

testingAnswers = leadershipAnswers[len(leadershipAnswers)*3//4:]
testingScores = scores[len(scores)*3//4:]
for sentences, testscore in zip(testingAnswers, testingScores):

    sentlist = [s for d in sentences for s in d]

    llhd = np.array([m.score(sentlist, total_sentences=len(sentlist)) for m in starmodels])
    lhd = np.exp(llhd - llhd.max(axis=0))
    prob = pd.DataFrame( (lhd/lhd.sum(axis=0)).transpose() )
    #print(llhd, lhd, prob)
    prob["doc"] = [i for i,d in enumerate(sentences) for s in d]
    prob = prob.groupby("doc").mean()
    score = prob.idxmax(axis=1).mean(axis="index")
    print(score+3, testscore, score+3 - testscore)


#pprint(leadershipAnswers)
#pprint(list(zip(scores,leadershipAnswers)))
