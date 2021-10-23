import config
import json

def executeQuery(query, params):
    conn = config.getConnection()
    cursor = conn.cursor()
    cursor.execute(query, params)
    columns = cursor.description
    result = []
    for value in cursor.fetchall():
        tmp = {}
        for (index,column) in enumerate(value):
            tmp[columns[index][0]] = column
        result.append(tmp)
    cursor.close()
    conn.close()
    return result

def getLogs():
    query = "SELECT * FROM log"
    result = executeQuery(query, ())
    return json.dumps(result)

def getLogById(logId):
    query = "SELECT * FROM log WHERE Id=%s"
    result = executeQuery(query, (logId, ))
    return result

def addLog(description, category, contents, date):
    query = "INSERT INTO log (Date, Description, Category, Contents) VALUES (%s, %s, %s, %s)"
    conn = config.getConnection()
    cursor = conn.cursor()
    result = ""
    try:
        cursor.execute(query, (date, description, category, contents))
        conn.commit()
        result = "Log added."
    except config.MySQLdb.Error as e:
        result = e
    cursor.close()
    conn.close()
    return json.dumps(result)

def updateLog(logId, description, category, contents, date):
    query = "UPDATE log SET Description =%s, Date =%s, Category=%s, Contents=%s WHERE Id=%s"
    conn = config.getConnection()
    cursor = conn.cursor()
    try:
        cursor.execute(query, (description, date, category, contents, logId))
        conn.commit()
        result = "Log updated."
    except config.MySQLdb.Error as e:
        result = e
    cursor.close()
    conn.close()
    return json.dumps(result)

def deleteLog(logId):
    query = "DELETE FROM log where Id=%s"
    conn = config.getConnection()
    cursor = conn.cursor()
    try:
        cursor.execute(query, (logId,))
        conn.commit()
        result = "Log deleted."
    except config.MySQLdb.Error as e:
        result = e
    cursor.close()
    conn.close()
    return json.dumps(result)

def searchLogs(searchTerm):
    query = "SELECT * FROM log WHERE description LIKE %s"
    result = executeQuery(query, ("%" + searchTerm + "%",))
    return result
