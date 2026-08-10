import requests
from bs4 import BeautifulSoup

url = "https://www.google.com/maps/place/BISMI+CAB'S,+6th+St,+Thiruvalluvar+Nagar,+Alandur,+Chennai,+Greater+Chennai,+Tamil+Nadu+600016/data=!4m2!3m1!1s0x3a5267643475a491:0x99e4d0ebdc71b89f"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9"
}

try:
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Check meta tags
    meta_desc = soup.find("meta", {"name": "description"})
    if meta_desc:
        print("Meta Description:")
        print(meta_desc.get("content"))
        
    og_desc = soup.find("meta", {"property": "og:description"})
    if og_desc:
        print("\nOG Description:")
        print(og_desc.get("content"))
        
except Exception as e:
    print(f"Error: {e}")
