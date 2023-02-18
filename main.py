from flask import Flask, render_template, request
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




if __name__ == "__main__":
    app.run()