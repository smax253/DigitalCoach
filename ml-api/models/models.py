import pickle

TEXT_MODEL = pickle.load(open("models/text_model.pkl", "rb"))
TFIDF_MODEL = pickle.load(open("models/tfidf_model.pkl", "rb"))
