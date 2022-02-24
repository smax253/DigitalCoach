import flask 
import io 
import string
import time 
import os 
import numpy as np
import tensorflow as tf 
from flask import Flask, jsonify, request 

# Load the model herer 
model = 'model'

# initalize the Flask object
app = Flask(__name__)

'''
POST request with a text option within the text body 
that has to get processed and then fed into the model.
'''
@app.route('/predict-text', method=['POST'])
def score_text_structure(): 
    pass