
import string
from flask import Flask, jsonify, request 
import pickle
import pandas as pd
import re, string
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer

nltk.download('omw-1.4')

# Load the model herer 
MODEL = pickle.load(open('text_model.pkl', 'rb'))
TFIDF_MODEL = pickle.load(open('tfidf_model.pkl', 'rb'))

# initalize the Flask object
app = Flask(__name__)

#convert to lowercase, strip and remove punctuations
def preprocess(text):
    text = text.lower() 
    text=text.strip()  
    text=re.compile('<.*?>').sub('', text) 
    text = re.compile('[%s]' % re.escape(string.punctuation)).sub(' ', text)  
    text = re.sub('\s+', ' ', text)  
    text = re.sub(r'\[[0-9]*\]',' ',text) 
    text=re.sub(r'[^\w\s]', '', str(text).lower().strip())
    text = re.sub(r'\d',' ',text) 
    text = re.sub(r'\s+',' ',text) 
    return text

 
# STOPWORD REMOVAL
def stopword(string):
    a= [i for i in string.split() if i not in stopwords.words('english') and i not in ["uhh", "umm", "uhm"]]
    return ' '.join(a)
#LEMMATIZATION
# Initialize the lemmatizer
wl = WordNetLemmatizer()
 
# This is a helper function to map NTLK position tags
def get_wordnet_pos(tag):
    if tag.startswith('J'):
        return wordnet.ADJ
    elif tag.startswith('V'):
        return wordnet.VERB
    elif tag.startswith('N'):
        return wordnet.NOUN
    elif tag.startswith('R'):
        return wordnet.ADV
    else:
        return wordnet.NOUN
# Tokenize the sentence
def lemmatizer(string):
    word_pos_tags = nltk.pos_tag(word_tokenize(string)) # Get position tags
    a=[wl.lemmatize(tag[0], get_wordnet_pos(tag[1])) for idx, tag in enumerate(word_pos_tags)] # Map the position tag and lemmatize the word/token
    return " ".join(a)

def finalpreprocess(string):
    return lemmatizer(stopword(preprocess(string)))


def clean_text(answer):
    process_answer = [[answer]]
    df = pd.DataFrame(process_answer, columns = ['sentence'])
    df['cleaned'] = df['sentence'].apply(lambda x: finalpreprocess(x))
    return df['cleaned']

def predict_text_structure(text):
    X_vector = TFIDF_MODEL.transform(text)
    y_prob = MODEL.predict_proba(X_vector)[:,1][0]
    return y_prob, 1 if y_prob > 0.5 else 0


'''
POST request with a text option within the text body 
that has to get processed and then fed into the model.
'''
@app.route('/predict-text', methods=['POST'])
def score_text_structure(): 
    content = request.get_json()
    if not content['answer']: 
        return 'Text to predict does not exist.'
    text = content['answer'] 
    cleaned = clean_text(text)
    predictions = predict_text_structure(cleaned)
    return jsonify(percent_prediction=predictions[0],
                   binary_prediction=predictions[1])


@app.route('/', methods=['GET'])
def index(): 
    return 'Welcome to the ML API for Digital Coach'

if __name__ == '___main__':
    app.run(debug=True, host='0.0.0.0')