import src.utils.loadData as loadData
import os
from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import csv
import src.utils.function as function
from tqdm import tqdm
import subprocess
import sys
import threading

def update():
    df = pd.read_csv('data/twitter_train.csv', sep=',', quotechar='"', quoting=csv.QUOTE_ALL, low_memory=False)
    
    headWords = []

    type_exclus = ["ham", "spam"]

    data = df.copy()[df["type"].isin(type_exclus)]

    data = data[['texte', 'type']]

    data['texte'] = data['texte'].astype(str)


    data['texte'].apply(lambda x: function.addWord(x, headWords))

    headWords.append('texte')
    headWords.append('type')


    dataNum = pd.DataFrame(columns=headWords)

    document = data['texte']


    for index, row in tqdm(data.iterrows(), total=data.shape[0]):
        function.tfIdf(row, dataNum, data, headWords, document)


    fichier_csv = 'data/donneeNumeric.csv'

    dataNum.to_csv(fichier_csv, index=False)

    loadData.reloadModel()
    
    function.createModel()

    loadData.reloadModel()

    return "Test"