import requests 
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup


def get_rail_data():
    parsed_data = []
    url = 'http://api.irishrail.ie/realtime/realtime.asmx/getStationDataBsoupCodeXML_WithNumMins?StationCode=ENFLD&NumMins=90&format=xml'
    data = requests.get(url)
    data = data.content
    print(data)
#     soup = BeautifulSoup(data)
#     for i in soup.find_all('objstationdata'):
#         data_item = {}
#         print("********")
#         for x in i.find_all():
#                 print(x.name)
#         #     if len(x.contents) == 1:
        #         data_item[x.name] = x.contents[0]
        # parsed_data.append(data_item)

get_rail_data()