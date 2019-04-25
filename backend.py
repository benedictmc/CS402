import requests
from flask import Flask, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    get_rail_data()
    return "Hello World!"

@app.route("/data")
def get_rail_data():
    url = 'http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ENFLD&NumMins=90&format=xml'
    parsed_data = []
    data = requests.get(url)
    data = data.content
    soup = BeautifulSoup(data)

    for i in soup.find_all('objstationdata'):
        data_item = {}
        print("********")
        for x in i.find_all():
            if len(x.contents) == 1:
                data_item[x.name] = x.contents[0]
        parsed_data.append(data_item)
    
    print(parsed_data)
    return jsonify(parsed_data)


if __name__ == "__main__":
    app.run()
    get_rail_data()