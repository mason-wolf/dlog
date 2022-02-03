from flask import Flask, request
from flask import json
from flask.json import jsonify
from api import log, project
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
    status = payload["Status"]
    project_id = payload["Project_ID"]
    return jsonify(log.addLog(description, category, contents, date, status, project_id))

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
    status = payload["Status"]
    project_id = payload["Project_ID"]
    return jsonify(log.updateLog(Id, description, category, contents, date, status, project_id))

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
    return jsonify(log.getLogsByCategory(category))

@app.route('/getLogsByProjectId', methods=['POST'])
def getLogsByProjectId():
    payload = request.data
    payload = json.loads(payload)
    projectId = payload
    return jsonify(log.getLogsByProjectId(projectId))

@app.route('/getLogsByDate', methods=['POST'])
def getLogsByDate():
    payload = request.data
    payload = json.loads(payload)
    startDate = payload['startDate']
    endDate = payload['endDate']
    return jsonify(log.getLogsByDate(startDate, endDate))
    
@app.route('/getProjects', methods=["GET"])
def getProjects():
    return jsonify(project.getProjects())

@app.route('/addProject', methods=['POST'])
def addProject():
    payload = request.data
    payload = json.loads(payload)
    projectName = payload
    return jsonify(project.addProject(projectName))

@app.route('/deleteProject', methods=['POST'])
def deleteProject():
    payload = request.data
    payload = json.loads(payload)
    Id = payload
    return jsonify(project.deleteProject(Id))

if __name__ == '__main__':
    app.run(host="localhost", port=80)
    
