from flask import jsonify
import src.utils.loadData as loadData
import re
import src.utils.function as function

def predict(data):
    message = data.get('message')
    messageType = function.getSentiment(message, loadData.dataNum)
    messageType = messageType[0]
    result = {"message": message , "type": messageType}
    return jsonify(result)