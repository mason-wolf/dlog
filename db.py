from configparser import DEFAULTSECT
import mysql.connector

def getConnection():
    db = mysql.connector.connect(
        host = "aa9xz8i0zjsz4s.ct7fhre5oddy.us-east-2.rds.amazonaws.com",
        user="",
        password="",
        database=""
    )
    return db

def executeQuery(query, params):
    conn = getConnection()
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