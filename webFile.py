from flask import Flask, render_template
import time, json, os
import ftplib
import requests

app = Flask(__name__)
# @app.route("/home")
# def index():
#     n = 'Dave'
#     # return "<p>Hello World!!</p>"
#     return render_template("index.html", name = n)

@app.route('/home')
def index():
    # 示例数据
    labels = ["January", "February", "March", "April", "May", "June", "July"]
    values = [10, 9, 8, 7, 6, 5, 4]

    return render_template('index.html', labels=labels, values=values)

if __name__ == '__main__':
    
    app.run(
        host='0.0.0.0',
        port = 8000,
        debug=True
    )