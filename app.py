from flask import Flask, request
from flask import json
from flask.json import jsonify
from api import log
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/getLogs')
def getLogs():
    return log.getLogs()

@app.route('/addLog', methods=['POST'])
def addLog():
    payload = request.data
    payload = json.loads(payload)
    description = payload["Description"]
    category = payload["Category"]
    contents = payload["Contents"]
    date = payload["Date"]
    return jsonify(log.addLog(description, category, contents, date))

@app.route('/getLogById', methods=['POST'])
def getLogById():
    payload = request.data
    payload = json.loads(payload)
    Id = payload
    return jsonify(log.getLogById(Id))

@app.route('/updateLog', methods=['POST'])
def updateLog():
    payload = request.data
    payload = json.loads(payload)
    Id = payload["Id"]
    description = payload["Description"]
    category = payload["Category"]
    contents = payload["Contents"]
    date = payload["Date"]
    return jsonify(log.updateLog(Id, description, category, contents, date))

@app.route('/deleteLog', methods=['POST'])
def deleteLog():
    payload = request.data
    payload = json.loads(payload)
    Id = payload
    return jsonify(log.deleteLog(Id))

@app.route('/searchLogs', methods=['POST'])
def searchLogs():
    payload = request.data
    payload = json.loads(payload)
    searchTerm = payload
    return jsonify(log.searchLogs(searchTerm))

@app.route('/getLogCategories', methods=['GET'])
def getLogCategories():
    return jsonify(log.getLogCategories())

@app.route('/getLogsByCategory', methods=['POST'])
def getLogsByCategory():
    payload = request.data
    payload = json.loads(payload)
    category = payload
    print(category)
    return jsonify(log.getLogsByCategory(category))

@app.route('/getLogsByDate', methods=['POST'])
def getLogsByDate():
    payload = request.data
    payload = json.loads(payload)
    startDate = payload['startDate']
    endDate = payload['endDate']
    return jsonify(log.getLogsByDate(startDate, endDate))
    
if __name__ == '__main__':
    app.run()

