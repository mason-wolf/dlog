from dao import projectdb
import json

def getProjects():
    return projectdb.getProjects()

def addProject(projectName):
    return projectdb.addProject(projectName)