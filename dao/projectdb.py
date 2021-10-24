import db
import json

def getProjects():
    query = "SELECT * FROM project"
    result = db.executeQuery(query, ())
    return result

def addProject(projectName):
    query = "INSERT INTO project (project_name) VALUES (%s)"
    conn = db.getConnection()
    cursor = conn.cursor()
    result = ""
    cursor.execute(query, (projectName,))
    conn.commit()
    result = "Log added."
    cursor.close()
    conn.close()
    return json.dumps(result)

def deleteProject(projectId):
    # Delete the project first.
    query = "DELETE FROM project WHERE ID=%s"
    conn = db.getConnection()
    cursor = conn.cursor()
    result = ""
    cursor.execute(query, (projectId,))
    conn.commit()
    result = "Project deleted."
    cursor.close()
    conn.close()