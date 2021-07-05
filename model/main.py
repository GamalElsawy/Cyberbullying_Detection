from flask import Flask,request,jsonify
from flask_cors import CORS

import numpy as np
import pandas as pd
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model

from dotenv import load_dotenv
dotenv_path = 'environment.env'  # Path to .env file
load_dotenv(dotenv_path)

app = Flask(__name__)
CORS(app)
@app.route('/validateString', methods=['GET', 'POST'])
def validateString():

   text = str(request.get_data())
   text = text[2:len(text)-1]

   sample=[] # ["COCKSUCKER BEFORE YOU PISS AROUND ON MY WORK","UNBLOCK ME OR I'LL GET MY LAWYERS ON TO YOU FOR BLOCKING MY CONSTITUTIONAL RIGHT TO FREE SPEECH"]
   sample.append(text)


   train = pd.read_csv('model/train.csv')
   classes = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]
   train_sentences = train['comment_text']
   max_features = 22000



   tokenizers = Tokenizer(num_words = max_features)
   tokenizers.fit_on_texts(list(train_sentences))
   tokenized = tokenizers.texts_to_sequences(sample)
   case = pad_sequences(tokenized,maxlen=200) 
   
   from keras.models import model_from_json 
   json_file = open('model/LSTM_ARCH.json','r')
   loaded_model_json = json_file.read()
   json_file.close()
   model = model_from_json(loaded_model_json)
   model.load_weights("model/LSTM_WHEIGHTS.h5")
   model.compile(
      loss='binary_crossentropy',
      optimizer='adam',
      metrics=['accuracy']
   )

   predict = model.predict(case)
   predict = np.where(predict>=0.1)
   coord = list(zip(predict[0],predict[1]))
   output = []
   for x,y in coord:
     output.append(classes[y])

   output = list(set(output))
   
   return jsonify(output)





if __name__ == '__main__':
   app.run(port=5001)
