from flask import jsonify
import src.utils.basicFunction as basicFunc
import re
import pandas as pd
import csv

def update(data):
    message = data.get('message')
    messageType = data.get('type')
    
    df = pd.read_csv('data/twitter_train.csv', sep=',', quotechar='"', quoting=csv.QUOTE_ALL, low_memory=False)


    new_row_data = [message, messageType]  # Adjust these values according to your DataFrame's column types and order
    new_row = pd.Series(new_row_data, index=df.columns)

    df_updated = pd.concat([df, new_row.to_frame().T], ignore_index=True)

    # Save the updated DataFrame to the same CSV file, overwriting the original
    df_updated.to_csv('data/twitter_train.csv', index=False)

    return "test"

