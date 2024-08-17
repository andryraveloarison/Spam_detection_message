import math
from sklearn.model_selection import train_test_split
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.utils import shuffle
from joblib import dump
import src.utils.loadData as loadData



def compressWord(text):
    result = ""
    long = len(text) 
    if long > 2:
        for i in range(len(text) - 2):
            if not (text[i] == text[i+1] and text[i] == text[i+2]):  # Vérifie si le caractère actuel est le même que le suivant
                result += text[i]
        return result+str(text[long-2])+str(text[long-1])

    else :
        return text



def cleanData(text):
    cs = ":;?/.>,<()&*^%$#@!\|{}[]~"
    for i in cs:
        if i in text:
            text = text.replace(i," ")
            
    return text



def addWord(sentence, headWords):
    listWords =  sentence.split(" ")
    for word in listWords: 
        word = compressWord(word)
        if word and word not in headWords:
            headWords.append(word)


def getTF(word, sentence):
    listWords =  sentence.lower().split(" ")
    frequency = 0
    for element in listWords:
        if element == word:
            frequency += 1

    return frequency

def getN(df):
    return len(df.index)



def getNe(word, df):
    ne= 0
    for element in df:
        textes = element.split(" ")
        for text in textes:
            text = compressWord(text)
            if word == text:
                ne += 1
                break
    if ne == 0:
        ne=1
        
    return ne

def tfIdf(row, dataNum, data, headWords, document):
    rep = []
    texte = row.texte.split(" ")
    valueDoc = {}
    n = getN(data)

    for word in texte:
        isInText = False
        for element in headWords:
            if element == word:
                if word in valueDoc:
                    valueDoc[word] += 1
                else:
                    valueDoc[word] = 1
            else:
                if element not in valueDoc:
                    if element == "texte":
                        valueDoc["texte"] = row.texte
                    elif element == "type":
                        valueDoc["type"] = row.type
                    else:
                        valueDoc[element] = 0
   
    for i in valueDoc:
        if isinstance(valueDoc[i], int):
            ne = getNe(i, document)
            value = valueDoc[i] * math.log(n/ne)
            rep.append(value)
        else:
            rep.append(valueDoc[i])


    dataNum.loc[len(dataNum)] = rep



def TestTfIdf(textes ,dataNum , heads, doc):
    rep = []
    texte = textes.split(" ")
    valueDoc = {}
    n = getN(dataNum)
    for word in texte:
        isInText = False
        for element in heads:
            if element == word:
                if word in valueDoc:
                    valueDoc[word] += 1
                else:
                    valueDoc[word] = 1
            else:
                valueDoc[element] = 0

    for i in valueDoc:
        if isinstance(valueDoc[i], int):
            ne = getNe(i, doc)
            value = valueDoc[i] * math.log(n/ne)
            rep.append(value)
        else:
            rep.append(valueDoc[i])

    # Ajout d'une nouvelle ligne à dataNum avec les données de la ligne actuelle de data
    return rep    


def createDataTest(dataTest, dataNum):
    dataInsert = []
    heads = []
    heads = dataNum.columns.tolist()
    # Obtenir le nombre total de colonnes
    total_columns = dataNum.shape[1]
    
    # Calculer l'indice du deuxième dernier colonne
    second_last_column_index = total_columns - 2
    
    # Sélectionner la colonne
    second_last_column = dataNum.iloc[:, second_last_column_index]
    
    doc = dataNum.astype(str)
    
    dataInsert = pd.DataFrame(columns=heads)

    #dataTest = TestTfIdf(inputTest, dataNum, heads, doc)
    
    for index, row in tqdm(dataTest.iterrows(), total=dataTest.shape[0]):
         TestTfIdf(row,dataInsert, dataNum, heads, doc)

    fichier_csv = './data/donneeTest.csv'

    # Sauvegarde de dataNum dans un fichier CSV
    dataInsert.to_csv(fichier_csv, index=False)



def createModel():
    global dataNum
    loadData.reloadModel
    df = loadData.dataNum
    df = shuffle(df)

    X = df.iloc[:, 0:-2].values
    y = df.iloc[:, -1].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

    clf = RandomForestClassifier(random_state=0)
    clf = clf.fit(X_train, y_train)

    y_pred = clf.predict(X_test)

    cm = confusion_matrix(y_test, y_pred)

    print("**********")
    print(accuracy_score(y_test, y_pred))
    print("**********")

    dump(clf, './modele/modele.joblib')  # Remplacez 'mon_modele.joblib' par le chemin où vous souhaitez sauvegarder le fichier


def getSentiment(inputTest, dataNum):
    dataTest = []
    dataInsert = []
    heads = []
    heads = dataNum.columns.tolist()
    # Obtenir le nombre total de colonnes
    total_columns = dataNum.shape[1]
    
    # Calculer l'indice du deuxième dernier colonne
    second_last_column_index = total_columns - 2
    
    # Sélectionner la colonne
    second_last_column = dataNum.iloc[:, second_last_column_index]
    
    doc = second_last_column.astype(str)
    dataTest = TestTfIdf(inputTest, dataNum, heads, doc)
    
    dataInsert = pd.DataFrame(columns=heads)
    
    dataInsert.loc[0] = dataTest
    
    
    dataInsert = dataInsert.iloc[:, :-2]
    global modele
    modele = loadData.reloadModel()
    prediction = modele.predict(dataInsert)
    return prediction
