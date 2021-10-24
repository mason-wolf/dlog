from dao import logdb

def getLogs():
    return logdb.getLogs()

def getLogById(logId):
    return logdb.getLogById(logId)

def getLogsByProjectId(projectId):
    return logdb.getLogsByProjectId(projectId)

def addLog(description, category, contents, date, status, project_id):
    return logdb.addLog(description, category, contents, date, status, project_id)

def updateLog(logId, description, category, contents, date, status, project_id):
    return logdb.updateLog(logId, description, category, contents, date, status, project_id)

def deleteLog(logId):
    return logdb.deleteLog(logId)

def searchLogs(searchTerm):
    return logdb.searchLogs(searchTerm)

def getLogCategories():
    return logdb.getLogCategories()

def getLogsByCategory(category):
    return logdb.getLogsByCategory(category)

def getLogsByDate(startDate, endDate):
    return logdb.getLogsByDate(startDate, endDate)
