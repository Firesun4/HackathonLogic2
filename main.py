from importlib.metadata import metadata
from xmlrpc.client import boolean
from fastapi import FastAPI, Depends, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import update
from sql import SessionLocal, engine, meta
from models import PollutionMapData
import uvicorn, sql, uuid
import csv
from numpy import genfromtxt, arange


PollutionMapData.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)

def get_session():
     Session = sessionmaker(bind=engine)
     db = Session()
     return db

@app.get("/")
def start():
    f = open("workingMap.html", "r")
    html_content = f.read()
    return HTMLResponse(content=html_content, status_code=200)


@app.get("/get/all-aqi")
def get_all_data():
     Session = sessionmaker(bind=engine)
     db = Session()

     data = db.query(PollutionMapData).all()
     return data


@app.get("/load-csv")
def load_csv():
        Session = sessionmaker(bind=engine)
        db = Session()
        data = genfromtxt("HourlyAQObs_2023010100.dat", delimiter=',', skip_header=1, encoding="utf-8", invalid_raise=False, dtype=str)
        # map_data = "HourlyAQObs_2023010100.dat" #sample CSV file used:  http://www.google.com/finance/historical?q=NYSE%3AT&ei=W4ikVam8LYWjmAGjhoHACw&output=csv
        # data = csv.reader(map_data, delimiter=",")
        data = data.tolist()
        print(type(data[1][0]))

        for i in data:
            if(i[8] == "US"):
                record = PollutionMapData(**{
                    'id' : i[0],
                    "latitude" : i[4],
                    'longitude' : i[5],
                    'elevation' : i[6],
                    'stateName' : i[9],
                    'ozone' : i[14],
                    'pm10' : i[15],
                    'pm25' : i[16],
                    'No2' : i[17],
                })
                db.add(record) #Add all the records

        db.commit() #Attempt to commit all the records

        return record


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


if __name__ == "__main__":
    get_db()

    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
