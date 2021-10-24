import db
import json

def getLogs():
    query = "SELECT * FROM log"
    result = db.executeQuery(query, ())
    return json.dumps(result)

def getLogById(logId):
    query = "SELECT * FROM log WHERE Id=%s"
    result = db.executeQuery(query, (logId, ))
    return result

def getLogsByProjectId(projectId):
    query = "SELECT * FROM log WHERE Project_ID=%s ORDER BY Date DESC"
    result = db.executeQuery(query, (projectId, ))
    return result

def addLog(description, category, contents, date, status, project_id):
    query = "INSERT INTO log (Date, Description, Category, Contents, Status, Project_ID) VALUES (%s, %s, %s, %s, %s, %s)"
    conn = db.getConnection()
    cursor = conn.cursor()
    result = ""
    cursor.execute(query, (date, description, category, contents, status, project_id))
    conn.commit()
    result = "Log added."
    cursor.close()
    conn.close()
    return json.dumps(result)

def updateLog(logId, description, category, contents, date, status, project_id):
    query = "UPDATE log SET Description =%s, Date =%s, Category=%s, Contents=%s, Status=%s, Project_ID=%s WHERE Id=%s"
    conn = db.getConnection()
    cursor = conn.cursor()
    cursor.execute(query, (description, date, category, contents, status, project_id, logId))
    conn.commit()
    result = "Log updated."
    cursor.close()
    conn.close()
    return json.dumps(result)

def deleteLog(logId):
    query = "DELETE FROM log where Id=%s"
    conn = db.getConnection()
    cursor = conn.cursor()
    cursor.execute(query, (logId,))
    conn.commit()
    result = "Log deleted."
    cursor.close()
    conn.close()
    return json.dumps(result)

def searchLogs(searchTerm):
    query = "SELECT * FROM log WHERE description LIKE %s"
    result = db.executeQuery(query, ("%" + searchTerm + "%",))
    return result

def getLogCategories():
    query = "SELECT Category, Count(*) as Count FROM log GROUP BY Category"
    result = db.executeQuery(query, ())
    return result

def getLogsByCategory(category):
    query = "SELECT * FROM log WHERE Category LIKE %s"
    result = db.executeQuery(query, ("%" + category + "%",))
    return result

def getLogsByDate(startDate, endDate):
    query = "SELECT * FROM log WHERE (Date BETWEEN %s AND %s) ORDER BY Date DESC"
    result = db.executeQuery(query, (startDate, endDate),)
    return result