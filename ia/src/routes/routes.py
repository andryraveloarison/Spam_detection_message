from flask import Blueprint, request, jsonify
import src.controllers.updateBase as base
import src.controllers.updateModel as model
import src.controllers.prediction as prediction
from flask import Flask, request, jsonify
from flask_cors import cross_origin
import io



bp = Blueprint('api_bp', __name__)

# Middleware pour vérifier la clé d'API
def check_api_key(func):
    def wrapper(*args, **kwargs):

        api_key = request.headers.get('X-API-KEY')
        api_secret = request.headers.get('X-API-SECRET')

        authorized_keys = loadData.authorized_keys
        
         # Vérifier si les clés d'API et de secret sont présentes
        if not api_key or not api_secret:
            return jsonify({'error': 'Clé d\'API ou clé secrète manquante'}), 401

        # Vérifier la validité des api_key et api_secret dans une seule condition
        if (api_key in authorized_keys and authorized_keys[api_key] == api_secret) or \
           (api_secret in authorized_keys and authorized_keys[api_secret] == api_key):

            return func(*args, **kwargs)
            
        else:
            return jsonify({'error': 'Clé d\'API ou clé secrète invalide'}), 401


    return wrapper


@bp.route('/updateBase', methods=['POST'])
@cross_origin()
def updateBase():
    data = request.json
    
    return base.update(data)


@bp.route('/updateModel', methods=['GET'])
@cross_origin()
def updateModel():
    return model.update()



@bp.route('/getType', methods=['POST'])
@cross_origin()
def predict():
    data = request.json
    return prediction.predict(data)
    

