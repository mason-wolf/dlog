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
