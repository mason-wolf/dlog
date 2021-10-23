from db import logdb

def getLogs():
    return logdb.getLogs()

def getLogById(logId):
    return logdb.getLogById(logId)
    
def addLog(description, category, contents, date):
    return logdb.addLog(description, category, contents, date)

def updateLog(logId, description, category, contents, date):
    return logdb.updateLog(logId, description, category, contents, date)

def deleteLog(logId):
    return logdb.deleteLog(logId)

def searchLogs(searchTerm):
    return logdb.searchLogs(searchTerm)
