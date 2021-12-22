import tensorflow as tf 
import numpy as np
import os
import time
import functools
from tqdm import tqdm

# Check that we are using a GPU, if not switch runtimes
#   using Runtime > Change Runtime Type > GPU
# assert len(tf.config.list_physical_devices('GPU')) > 0

# LOAD IN DATA HERE

# CONVERT DATA OUTPUT PROBABILITIES WITH INVERSE SIGMOID

# USE SPACY TO EMBED INPUTS

class RNN:
    checkpoint_dir_base = './training_checkpoints'
    def __init__(self, iterations, learning_rate, rnn_units, checkpoint_dir, checkpoint_name):

        assert (checkpoint_dir == "adaptability" or checkpoint_dir == "communication" or checkpoint_dir == "integrity" or checkpoint_dir == "leadership" or checkpoint_dir == "teamwork"), "Incorrect checkpoint_dir input."
        assert (t_iterations > 0), "iterations must be a positive number."
        assert (learning_rate > 0), "learning_rate must be a positive number."

        ### Hyperparameter setting and optimization ###

        # Optimization parameters:
        self.t_iterations = iterations
        self.learning_rate = learning_rate

        # Checkpoint location: 
        self.checkpoint_prefix = os.path.join(checkpoint_dir_base, checkpoint_dir, checkpoint_name)

        self.model = tf.keras.Sequential([
            # Layer 1: LSTM with `rnn_units` number of units. 
            tf.keras.layers.LSTM(
                rnn_units, 
                return_sequences=True, 
                recurrent_initializer='glorot_uniform',
                recurrent_activation='sigmoid',
                stateful=True,
            ),
            # Layer 2: Dense (fully-connected) layer that transforms the LSTM output into a real number.
            tf.keras.layers.Dense(1)
        ])

        # Automatically load latest results
        try:
            self.model.load_weights(tf.train.latest_checkpoint(os.path.join(checkpoint_dir_base, checkpoint_dir))
        except NotFoundError:
            pass

    def train(self, x, y):
        def compute_loss(y_true, y_pred):
            # The loss between the true probabilities and predictions .
            loss = tf.keras.losses.MSE(y_true, y_pred)
            return loss

        '''TODO: instantiate an optimizer with its learning rate.
        Checkout the tensorflow website for a list of supported optimizers.
        https://www.tensorflow.org/api_docs/python/tf/keras/optimizers/
        Try using the Adam optimizer to start.'''
        optimizer = tf.keras.optimizers.Adam(learning_rate=self.learning_rate)

        def train_step(x, y): 
            # Use tf.GradientTape()
            with tf.GradientTape() as tape:

                '''TODO: feed the current input into the model and generate predictions'''
                y_hat = model(x)

                '''TODO: compute the loss!'''
                loss = compute_loss(y, y_hat)

                # Now, compute the gradients 
                '''TODO: complete the function call for gradient computation. 
                Remember that we want the gradient of the loss with respect all 
                of the model parameters. 
                HINT: use `model.trainable_variables` to get a list of all model
                parameters.'''
                grads = tape.gradient(loss, model.trainable_variables)

                # Apply the gradients to the optimizer so it can update the model accordingly
                optimizer.apply_gradients(zip(grads, model.trainable_variables))
                return loss
        if hasattr(tqdm, '_instances'): tqdm._instances.clear() # clear if it exists

        ##################
        # Begin training!#
        ##################
        for iter in tqdm(range(self.t_iterations)):

            # Grab a batch and propagate it through the network
            loss = train_step(x, y)

            # Update the model with the changed weights!
            if iter % 100 == 0:     
                model.save_weights(self.checkpoint_prefix)
            
        # Save the trained model and the weights
        model.save_weights(self.checkpoint_prefix)
        
    def predict(self, x):
        self.model.reset_states()
        prediction = tf.squeeze(model(input_eval), 0)
        return prediction.numpy()

    def predictProb(self, x):
        self.model.reset_states()
        prediction = tf.squeeze(model(input_eval), 0)
        return tf.math.sigmoid(prediction.numpy())