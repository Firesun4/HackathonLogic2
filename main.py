from flask import Flask, render_template, request
import sys
sys.path.append(".")

app = Flask(__name__)

# define app routes
@app.route('/')
def index():
    return render_template("index.html")

@app.route("/")

@app.route('/get')
# function for the bot response
def get_bot_response():
    return response


@app.route('/update')
# function to update database'
def update_Data():



if __name__ == "__main__":
    app.run()