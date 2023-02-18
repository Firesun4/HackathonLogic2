from flask import Flask, render_template, request
from importlib.metadata import metadata
from xmlrpc.client import boolean
# from fastapi import FastAPI, Depends, Form
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import update
from sql import SessionLocal, engine, meta
from models import PollutionMapData
import sys


sys.path.append(".")

app = Flask(__name__)

# define app routes
@app.route('/')
def index():
    return render_template("index.html")

@app.route("/solutions")
def solutions():
    return render_template("solutions.html")

@app.route('/get')
# function for the bot response
def get_bot_response():
    pass #return map visualization


@app.route('/update')
# function to update database'
def update_Data():
    #to update the maps
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

if __name__ == "__main__":
    app.run()
