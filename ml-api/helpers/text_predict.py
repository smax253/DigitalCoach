from models.models import TFIDF_MODEL, TEXT_MODEL


def predict_text_structure(text):
    X_vector = TFIDF_MODEL.transform(text)
    y_prob = TEXT_MODEL.predict_proba(X_vector)[:, 1][0]
    return y_prob, 1 if y_prob > 0.5 else 0
