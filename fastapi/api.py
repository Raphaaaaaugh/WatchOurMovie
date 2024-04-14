import string
from fastapi import FastAPI, HTTPException, Query
import requests
import json
import mysql.connector
import datetime
import jwt
import os
from pydantic import BaseModel
from typing import Optional
from typing import List
from passlib.hash import bcrypt
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the base URL and API key
base_url = "http://nginx-proxy:8081"
api_key = "5cad553ca21b1db5886498f3843a8264"
engine_address = "http://engine:8001"
SECRET_KEY= os.environ.get("SECRET_KEY")

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

class Login(BaseModel):
    name: str
    password: str

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
async def request_film_by_genre_id(genre_id: int):
    url = f"{base_url}/3/discover/movie?api_key={api_key}&with_genres={genre_id}"
    fetched_movies = []
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
                fetched_movies.append(movie['id'])
            # Check if there are more pages to fetch
            if page < movies_data['total_pages']:
                page += 1  # Move to the next page
            else:
                break  # No more pages to fetch
        else:
            print(f"Error: {response.status_code}")
            break  # Stop fetching if there's an error
    return fetched_movies


@app.get("/top_rated")
async def request_top_rated_films():
    url = f"{base_url}/3/discover/movie?api_key={api_key}&sort_by=vote_average.desc&vote_count.gte=400"
    movies = []
    page = 1  # Start with page 1
    while page < 50:
        # Append the page parameter to the URL
        page_url = f"{url}&page={page}"
        # Make the API request
        response = requests.get(page_url)
        if response.status_code == 200:
            # Process the response (e.g., convert it to JSON)
            movies_data = response.json()
            # Append the movies from this page to the movies list
            movies.extend(movies_data['results'])
            # Check if there are more pages to fetch
            if page < movies_data['total_pages']:
                page += 1  # Move to the next page
            else:
                break  # No more pages to fetch
        else:
            print(f"Error: {response.status_code}")
            break  # Stop fetching if there's an error
    return movies


@app.get("/get_users")
async def get_users():
    try:
        # Connexion à la base de données
        db_config = {
            'host': 'db',
            'user': 'api',
            'password': 'root',
            'database': 'WOM'
        }
        db_connection = mysql.connector.connect(**db_config)
        db_cursor = db_connection.cursor(dictionary=True)

        # Récupérer le mot de passe haché depuis la base de données
        db_cursor.execute('SELECT name FROM users')
        users = db_cursor.fetchall()
        return users

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        db_cursor.close()
        db_connection.close()
  


@app.get("/engine/")
async def compute_movies(list_users: List[str] = Query(...)):
    # Request must look like http://localhost:8000/engine/?list_users=John&list_users=Jane
    config = mysql.connector.connect(
        host="db",
        user="api",
        password="root",
        database="WOM"
    )
    users = []
    seen_movies = []
    # Get users infos and seen movies
    for name in list_users:
        cursor = config.cursor(dictionary=True)
        cursor.execute('SELECT * FROM users WHERE name=%s', (name,))
        res = cursor.fetchall()
        for user in res:
            users.append(user)
        cursor.execute('SELECT m.* FROM movies m INNER JOIN user_movie um ON m.id = um.movie_id INNER JOIN users u ON um.user_id = u.id WHERE u.name =%s', (name,))
        res = cursor.fetchall()
        for movie in res:
            seen_movies.append(movie)
        cursor.close()
    config.close()
    # Get the top 1000 movies by vote_average (neutral quality standard)
    top_movies = await request_top_rated_films()
    # Send the data to the engine
    data = {
        "seen_movies": seen_movies,
        "users": users,
        "top_movies": top_movies
    }
    url = engine_address + "/process_data"
    response = requests.post(url, json=data)
    return json.loads(response.text)


#---------------------------------------------------------------------------------------------
# POST endpoints


# Endpoint pour l'authentification d'un utilisateur
@app.post('/login')
def login(login_data: Login):
    try:
        # Connexion à la base de données
        db_config = {
            'host': 'db',
            'user': 'api',
            'password': 'root',
            'database': 'WOM'
        }
        db_connection = mysql.connector.connect(**db_config)
        db_cursor = db_connection.cursor(dictionary=True)

        # Récupérer le mot de passe haché depuis la base de données
        db_cursor.execute('SELECT id, name, firstname, password, like_adult, favorite_genres, favorite_runtime, favorite_period FROM users WHERE name = %s', (login_data.name,))
        user = db_cursor.fetchone()

        if user and bcrypt.verify(login_data.password, user['password']):
            jwt_token = create_jwt_token(login_data.name)
            return {'message': 'Authentification réussie', 'token': jwt_token, 'user': user}
        else:
            raise HTTPException(status_code=401, detail='Login ou mot de passe incorrect')

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        db_cursor.close()
        db_connection.close()

# Endpoint pour l'inscription d'un nouvel utilisateur
@app.post('/register')
def register(user_data: User):
    try:
        # Connexion à la base de données
        db_config = {
            'host': 'db',
            'user': 'api',
            'password': 'root',
            'database': 'WOM'
        }
        db_connection = mysql.connector.connect(**db_config)
        db_cursor = db_connection.cursor()

        db_cursor.execute('SELECT name FROM users WHERE name = %s', (user_data.name,))
        user = db_cursor.fetchone()
        if user:
            raise HTTPException(status_code=401, detail='Le nom est déjà utilisé')

        # Hashage et salage du mot de passe pour obtenir un hash unique
        hashed_password = bcrypt.hash(user_data.password)

        # Insérer les données de l'utilisateur dans la base de données avec le mot de passe haché et salé
        db_cursor.execute('INSERT INTO users (name, firstname, password, like_adult, favorite_genres, favorite_runtime, favorite_period) VALUES (%s, %s, %s, 0, "", -1, "")',
                           (user_data.name, user_data.firstname, hashed_password))
        db_connection.commit()
        jwt_token = create_jwt_token(user_data.name)
        db_cursor.execute('SELECT id, name, firstname, password, like_adult, favorite_genres, favorite_runtime, favorite_period FROM users WHERE name = %s', (user_data.name,))
        user = db_cursor.fetchone()

        return {'message': 'Utilisateur enregistré avec succès', 'token': jwt_token, 'user': user}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        db_cursor.close()
        db_connection.close()


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
    

# Endpoint pour l'authentification d'un utilisateur
@app.post('/user_stats')
def user_stats(login_data: Login):
    try:
        # Connexion à la base de données
        db_config = {
            'host': 'db',
            'user': 'api',
            'password': 'root',
            'database': 'WOM'
        }
        db_connection = mysql.connector.connect(**db_config)
        db_cursor = db_connection.cursor(dictionary=True)

        # Récupérer le mot de passe haché depuis la base de données
        db_cursor.execute('SELECT id, name, firstname, password, like_adult, favorite_genres, favorite_runtime, favorite_period FROM users WHERE name = %s', (login_data.name,))
        user_data = db_cursor.fetchone()

        if user_data and bcrypt.verify(login_data.password, user_data['password']):
            return user_data
        else:
            raise HTTPException(status_code=401, detail='Utilisateur introuvable dans la base. Vérifier les crédits.')

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        db_cursor.close()
        db_connection.close()

#---------------------------------------------------------------------------------------------
# PUT endpoints

#---------------------------------------------------------------------------------------------
# Other functions

# Fonction pour générer un token JWT
def create_jwt_token(user_name: str) -> str:
    # Définit la date d'expiration du token
    expiration_time = datetime.datetime.now() + datetime.timedelta(hours=1)
    
    # Créer les données à inclure dans le token
    payload = {
        'user_name': user_name,
        'exp': expiration_time
    }
    
    # Générer le token JWT en signant les données avec la clé secrète
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    
    # Retourner le token JWT
    return token




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)