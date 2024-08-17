import json
import os
import joblib
import pandas as pd
import csv


def load_api_keys():
    api_keys = {}
    for key in os.environ:

        if key.startswith('API_KEY_'):
            api_keys[os.getenv(key)] = f'{key}'  # Description basée sur le nom de la variable
    return api_keys


def reloadModel():
    global modele
    modele = joblib.load('modele/modele.joblib')

    global dataNum
    dataNum = pd.read_csv('data/donneeNumeric.csv', sep=',', quotechar='"', quoting=csv.QUOTE_ALL, low_memory=False)
    return modele



authorized_keys = load_api_keys()

modele = joblib.load('modele/modele.joblib')

dataNum = pd.read_csv('data/donneeNumeric.csv', sep=',', quotechar='"', quoting=csv.QUOTE_ALL, low_memory=False)
