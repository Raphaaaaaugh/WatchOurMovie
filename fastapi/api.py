import string
from fastapi import FastAPI, HTTPException
import requests
from requests import Request
import mysql.connector
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# Define the base URL and API key
base_url = "http://nginx-proxy:8081"
api_key = "5cad553ca21b1db5886498f3843a8264"

#---------------------------------------------------------------------------------------------

class User(BaseModel):
    name: str
    firstname: str
    price: float

#---------------------------------------------------------------------------------------------
    

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

"""
@app.post("/create_user/")
async def create_user(request: Request):
    data = await request.json()
    firstname = data.get("firstname")
    if not firstname:
        return {"error": "Please provide a firstname in the request body"}
    config = mysql.connector.connect(
        host="db",
        user="api",
        password="root",
        database="WOM"
    )
    cursor = config.cursor(dictionary=True)
    cursor.execute('INSERT INTO users (name, firstname) VALUES (%s, %s)', (firstname, firstname))
    config.commit()
    cursor.close()
    config.close()
    return {"message": "User created successfully"}
"""

@app.get("/infos_user/{firstname}")
def fetch_user(firstname: str):
    config = mysql.connector.connect(
        host="db",
        user="api",
        password="root",
        database="WOM"
    )
    cursor = config.cursor(dictionary=True)
    cursor.execute('SELECT seen_movies_list FROM users WHERE firstname=%s', (firstname,))
    results = cursor.fetchall()
    cursor.close()
    config.close()
    return results


@app.get("/movie_id/{movie_id}")
async def get_movie_details(movie_id: int):
    url = f"{base_url}/3/movie/{movie_id}?api_key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        # Process the response (e.g., convert it to JSON)
        movie_data = response.json()
        print(movie_data)
    else:
        print(f"Error: {response.status_code}")
    return response.json()


@app.get("/movie_genre/{genre_id}")
async def requestFilmByGenreId(genre_id: int):
    url = f"{base_url}/3/discover/movie?api_key={api_key}&with_genres={genre_id}"
    movies_titles = []
    page = 1  # Start with page 1
    while page < 10:
        # Append the page parameter to the URL
        page_url = f"{url}&page={page}"
        # Make the API request
        response = requests.get(page_url)
        if response.status_code == 200:
            # Process the response (e.g., convert it to JSON)
            movies_data = response.json()
            for movie in movies_data['results']:
                print(movie['title'])
                movies_titles.append(movie['title'])
            # Check if there are more pages to fetch
            if page < movies_data['total_pages']:
                page += 1  # Move to the next page
            else:
                break  # No more pages to fetch
        else:
            print(f"Error: {response.status_code}")
            break  # Stop fetching if there's an error
    return movies_titles





if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)