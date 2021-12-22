import nltk
from nltk.corpus import sentence_polarity
from nltk.sentiment.util import *
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from textblob import TextBlob

def test_main(threshold_pos= 0.2, threshold_neg = 0.2):
    '''
    Main testing grounds to understand VADER, Textblob and any other model we 
    come across. 
    NOTES: 
        VADER is well regarded for both microblog/ social media posts. Some sources
            said that VADER is tested on english historical texts as well.
            VADER IS GOOD.
        TextBlob is able to calculate polarity and subjectivity. Might be useful later. 

        Toggle variables with prefix 'threshold' to fit set of data more. Since professional 
            conversations are generally more polite, the negative threshold 
            can be > 0 so long as the positive threshold is >= negative threshold.
    '''
    
    # nltk.download('vader_lexicon')
    # nltk.download("sentence_polarity")

    if (threshold_pos<threshold_neg) or (threshold_pos<threshold_neg):
        raise Exception("Positive and negative threshold intersect")

    n_instances = 150
    pos_sentences = sentence_polarity.sents(categories='pos')[:n_instances]
    pos_sentences = [" ".join(a) for a in pos_sentences]
    
    neg_sentences = sentence_polarity.sents(categories='neg')[:n_instances]
    neg_sentences = [" ".join(a) for a in neg_sentences]


    # VADER TEST
    sid = SentimentIntensityAnalyzer()
    print('\n[VADER: results]')
    for document_lst, sentiment in [(pos_sentences, 'pos'), (neg_sentences, 'neg')]:
        # current=0
        current_pos = 0
        current_neg = 0
        total= 0
        for doc in document_lst:
            # print(doc)
            ss = sid.polarity_scores(doc)
            if (ss['compound']>threshold_pos):
                current_pos +=1
                # print(f'{doc} ----- pos\n')
            elif (ss['compound']<threshold_neg):
                current_neg +=1
                # print(f'{doc} ----- neg\n')
            total +=1

        print(f'Amount {sentiment} dataset identified as pos: {current_pos/total}')
        print(f'Amount {sentiment} dataset identified as neg: {current_neg/total}\n')
    

    # textBlob test:
    threshold_pos, threshold_neg = 0.05, 0.05
    print('\n\n[TextBLOB: results]')
    for document_lst, sentiment in [(pos_sentences, 'pos'), (neg_sentences, 'neg')]:
        # current=0
        current_pos = 0
        current_neg = 0
        total= 0
        for doc in document_lst:
            # print(doc)
            ss = TextBlob(doc).sentiment.polarity
            if (ss > threshold_pos):
                # print(f'{doc} ----- pos\n')
                current_pos +=1
            elif (ss < threshold_neg):
                # print(f'{doc} ----- neg\n')
                current_neg +=1
            total +=1

        print(f'Amount {sentiment} dataset identified as pos: {current_pos/total}')
        print(f'Amount {sentiment} dataset identified as neg: {current_neg/total}\n')
    
    return



def get_textBlob_sentiment(document_lst):
    '''
    Keeping it simple-- given a list of documents/texts, returns their 
    corresponding polarity in a list and corresponding subjectivity in a list.
    '''
    # uses textBlob
    if type(document_lst) is not list:
        raise Exception("Argument passed not a list!")

    polarity = []
    subjectivity =[]
    for doc in document_lst:
        ss = TextBlob(doc).sentiment
        polarity += [ss.polarity]
        subjectivity += [ss.subjectivity]
        
    return polarity, subjectivity


def get_VADER_sentiment(document_lst):
    # uses VADER
    if type(document_lst) is not list:
        raise Exception("Argument passed not a list!")

    polarity = []
    sid = SentimentIntensityAnalyzer()

    for doc in document_lst:
        ss = sid.polarity_scores(doc)['compound']
        # print(ss)
        polarity += [ss]
    
    return polarity 


def demo():
    # demo for how sentiment works
    # resp = [
    #     'You should hire me because my experience is almost perfectly aligned \
    #         with the requirements you asked for in your job listing. \
    #         I have seven years’ progressive experience in the hospitality industry\
    #         , advancing from my initial role as a front desk associate with \
    #         Excalibur Resort and Spa to my current position there as a concierge.\
    #         I’m well-versed in providing world-class customer service to an upscale \
    #         clientele, and I pride myself on my ability to quickly resolve problems \
    #         so that our guests enjoy their time with us.'
    # ]

    resp = ["CONGRATS!!!!"]
    polar = get_VADER_sentiment(resp)
    print(f'TEXT:{resp[0]}:\nCompound Score: {polar}') 

    '''
    From here, we can either calculate the overall mean scores but also can
    calculate how the answer progresses. In other words, we can analyze
    if a given response maintains relatively the same polarity or 
    changes from positive to negative/negative to positive. 
    '''
    return


if __name__ == "__main__":
    resp = ""
    while resp != 'exit':
        print("Enter text for sentiment analysis ('exit' to leave program): ")
        resp= input()
        if resp == 'exit':
            continue
        polar = get_VADER_sentiment([resp])
        print(f'Compound Score: {polar}\n') 

    # test_main()
    # demo()

