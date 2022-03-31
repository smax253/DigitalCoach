import re, string
import pandas as pd
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet
from nltk.stem import WordNetLemmatizer

nltk.download("omw-1.4")

#TODO: Along with this, we should include a text analysis on the big five traits

# convert to lowercase, strip and remove punctuations
def _preprocess(text):
    text = text.lower()
    text = text.strip()
    text = re.compile("<.*?>").sub("", text)
    text = re.compile("[%s]" % re.escape(string.punctuation)).sub(" ", text)
    text = re.sub("\s+", " ", text)
    text = re.sub(r"\[[0-9]*\]", " ", text)
    text = re.sub(r"[^\w\s]", "", str(text).lower().strip())
    text = re.sub(r"\d", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text


# STOPWORD REMOVAL
def _stopword(string):
    a = [
        i
        for i in string.split()
        if i not in stopwords.words("english") and i not in ["uhh", "umm", "uhm"]
    ]
    return " ".join(a)


# LEMMATIZATION
# Initialize the lemmatizer
wl = WordNetLemmatizer()

# This is a helper function to map NTLK position tags
def _get_wordnet_pos(tag):
    if tag.startswith("J"):
        return wordnet.ADJ
    elif tag.startswith("V"):
        return wordnet.VERB
    elif tag.startswith("N"):
        return wordnet.NOUN
    elif tag.startswith("R"):
        return wordnet.ADV
    else:
        return wordnet.NOUN


# Tokenize the sentence
def _lemmatizer(string):
    word_pos_tags = nltk.pos_tag(word_tokenize(string))  # Get position tags
    a = [
        wl.lemmatize(tag[0], _get_wordnet_pos(tag[1]))
        for idx, tag in enumerate(word_pos_tags)
    ]  # Map the position tag and lemmatize the word/token
    return " ".join(a)


def _finalpreprocess(string):
    return _lemmatizer(_stopword(_preprocess(string)))


def clean_text(answer):
    process_answer = [[answer]]
    df = pd.DataFrame(process_answer, columns=["sentence"])
    df["cleaned"] = df["sentence"].apply(lambda x: _finalpreprocess(x))
    return df["cleaned"]
