import string
from fastapi import FastAPI, HTTPException, Query
import requests
import mysql.connector
from pydantic import BaseModel
from typing import Optional
from typing import List

app = FastAPI()

# Define the base URL and API key
base_url = "http://nginx-proxy:8081"
api_key = "5cad553ca21b1db5886498f3843a8264"

#---------------------------------------------------------------------------------------------
# Classes

class User(BaseModel):
    name: str
    firstname: str
    password: str

class Film(BaseModel):
    title: str
    release_date: str
    original_title: str
    original_language: str
    backdrop_path: str

#---------------------------------------------------------------------------------------------
# GET endpoints

@app.get("/")
async def root():
    return {"message": "Hello, World!"}


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


@app.get("/engine/")
async def computeMovies(list_users: List[str] = Query(...)):
    # Request must look like http://localhost:8000/engine/?list_users=John&list_users=Jane
    config = mysql.connector.connect(
        host="db",
        user="api",
        password="root",
        database="WOM"
    )
    users = []
    seen_movies = []
    for name in list_users:
        cursor = config.cursor(dictionary=True)
        cursor.execute('SELECT * FROM users WHERE firstname=%s', (name,))
        res = cursor.fetchall()
        users.append(res)
        cursor.execute('SELECT m.* FROM movies m INNER JOIN user_movie um ON m.id = um.movie_id INNER JOIN users u ON um.user_id = u.id WHERE u.firstname =%s', (name,))
        res = cursor.fetchall()
        seen_movies.append(res)
        cursor.close()
    config.close()
    return users, seen_movies

#---------------------------------------------------------------------------------------------
# POST endpoints


@app.post("/create_user/")
async def create_user(user: User):
    firstname = user.firstname
    name = user.name
    password = user.password
    if not firstname:
        return {"error": "Please provide a firstname in the request body"}
    config = mysql.connector.connect(
        host="db",
        user="api",
        password="root",
        database="WOM"
    )
    cursor = config.cursor(dictionary=True)
    cursor.execute('INSERT INTO users (name, firstname, password) VALUES (%s, %s, %s)', (firstname, name, password))
    config.commit()
    cursor.close()
    config.close()
    return {"nah"}


@app.post("/add_film/")
async def add_film(film: Film):
    if not film.title:
        return {"error": "Please provide a title in the request body"}
    config = mysql.connector.connect(
        host="db",
        user="api",
        password="root",
        database="WOM"
    )
    cursor = config.cursor(dictionary=True)
    cursor.execute('INSERT INTO movies (title, release_date, original_language, original_title, backdrop_path) VALUES (%s, %s, %s, %s, %s)', (film.title, film.release_date, film.original_language, film.original_title, film.backdrop_path))
    config.commit()
    cursor.close()
    config.close()


#---------------------------------------------------------------------------------------------
# PUT endpoints







if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
