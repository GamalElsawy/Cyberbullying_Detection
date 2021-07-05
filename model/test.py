import numpy as np
import pandas as pd
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model

sample=["hey"]

train = pd.read_csv('model/train.csv')
classes = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]
targets = train[classes].values
train_sentences = train['comment_text']

max_features = 22000

tokenizers = Tokenizer(num_words = max_features)
tokenizers.fit_on_texts(list(train_sentences))
tokenized = tokenizers.texts_to_sequences(sample)
case = pad_sequences(tokenized, maxlen=200) 

#print(case)
model = load_model('model/LSTM.h5')
mdl = model.predict(case)

print(np.round(mdl,3))
mdl = np.where(mdl>=0.1)
#print(mdl[0])
#print(mdl[1])
coord = list(zip(mdl[0],mdl[1]))
output=[]
for x,y in coord:
  output.append(classes[y])

output = list(set(output))
print(output)