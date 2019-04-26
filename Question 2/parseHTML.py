import os
import requests 
from bs4 import BeautifulSoup
from xml.etree import ElementTree


name = 'maynoothuniversity'
url = 'https://www.maynoothuniversity.ie/'

raw_data = requests.get(url)
raw_html = raw_data.content  

soup = BeautifulSoup(raw_html, 'html.parser')
soup = soup.find('body')

os.makedirs(os.path.dirname(f'payloads/{name}'), exist_ok=True)
if name not in os.listdir('payloads/'):
    os.mkdir(f'payloads/{name}')
    os.mkdir(f'payloads/{name}/embedded')

with open(f"payloads/{name}/{name}.html", "w", encoding="utf-8") as file:
    file.write(soup.prettify())


links = [link.get('href') for link in soup.find_all('a')]

count = 1
for link in links:
    if link == '/' or '#' in link: continue
    if 'http' in link:
        url = link
        if 'https://www.' in link: e_name = link.replace('https://www.', '')
        elif 'https://' in link: e_name = link.replace('https://', '')
    elif 'http' not in link:
        url = url+link
        e_name = link
        print(link)

    raw_data = requests.get(url)
    raw_html = raw_data.content  

    soup = BeautifulSoup(raw_html, 'html.parser')
    soup = soup.find('body')

    e_name = e_name[:60]
    e_name = e_name.replace('/', '-')
    with open(f"payloads/{name}/embedded/{e_name}.html", "w", encoding="utf-8") as file:
        file.write(soup.prettify())
    count += 1
    print("Done")