from models.models import TFIDF_MODEL, TEXT_MODEL


def predict_text_structure(text):
    """
    It takes a text string, converts it to a TF-IDF vector, and then uses the trained model to predict
    the probability that the text is a summary
    
    :param text: The text to be classified
    :return: The probability of the text being a question and the predicted label (1 or 0)
    """
    X_vector = TFIDF_MODEL.transform(text)
    y_prob = TEXT_MODEL.predict_proba(X_vector)[:, 1][0]
    return y_prob, 1 if y_prob > 0.5 else 0
