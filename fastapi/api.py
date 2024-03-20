import string
from fastapi import FastAPI, HTTPException
import mysql.connector
from pydantic import BaseModel
from typing import Optional


app = FastAPI()

# Define the base URL and API key
base_url = "https://api.themoviedb.org/3"
api_key = "5cad553ca21b1db5886498f3843a8264"  # Replace this with your actual API key

#---------------------------------------------------------------------------------------------
# User related endpoints

from fastapi import FastAPI, HTTPException
import mysql.connector
from passlib.hash import bcrypt

app = FastAPI()

# Endpoint pour l'authentification d'un utilisateur
@app.post('/login')
def login(login_str: str, password_str: str):
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
        db_cursor.execute('SELECT password_str FROM users WHERE login_str = %s', (login_str,))
        user = db_cursor.fetchone()

        if user and bcrypt.verify(password_str, user['password_str']):
            return {'message': 'Authentification réussie'}
        else:
            raise HTTPException(status_code=401, detail='Login ou mot de passe incorrect')

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        db_cursor.close()
        db_connection.close()

# Endpoint pour l'inscription d'un nouvel utilisateur
@app.post('/register')
def register(login_str: str, password_str: str, username: str, firstname: str, lastname: str):
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

        # Hashage et salage du mot de passe pour obtenir un hash unique
        hashed_password = bcrypt.hash(password_str)

        # Insérer les données de l'utilisateur dans la base de données avec le mot de passe haché et salé
        db_cursor.execute('INSERT INTO users (login_str, password_str, username, firstname, lastname, movies_count) VALUES (%s, %s, %s, %s, %s, 0)',
                           (login_str, hashed_password, username, firstname, lastname))
        db_connection.commit()

        return {'message': 'Utilisateur enregistré avec succès'}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        db_cursor.close()
        db_connection.close()

# Endpoint pour ajouter un film à la liste d'un utilisateur
@app.post('/add_movie')
def add_movie(username: str, movie_name: str, table: str):
    try:
        if table not in ['watchlist', 'movies_watched']:
            raise HTTPException(status_code=400, detail='Nom de table invalide')

        # Connexion à la base de données
        db_config = {
            'host': 'db',
            'user': 'api',
            'password': 'root',
            'database': 'WOM'
        }
        db_connection = mysql.connector.connect(**db_config)
        db_cursor = db_connection.cursor()

        # On récupère l'ID du user
        db_cursor.execute('SELECT id FROM users WHERE username = %s', (username,))
        user = db_cursor.fetchone()
        if not user:
            raise HTTPException(status_code=404, detail='Utilisateur non trouvé')
        user_id = user[0]

        # On récupère l'ID du film
        db_cursor.execute('SELECT id FROM movies WHERE name = %s', (movie_name,))
        movie = db_cursor.fetchone()
        if not movie:
            raise HTTPException(status_code=404, detail='Film non trouvé')
        movie_id = movie[0]

        # Insertion du film dans la table appropriée (watchlist ou movies_watched)
        db_cursor.execute(f'INSERT INTO {table} (user_id, movie_id) VALUES (%s, %s)', (user_id, movie_id))
        db_connection.commit()

        return {'message': 'Film ajouté avec succès'}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        db_cursor.close()
        db_connection.close()


@app.route('/remove_movie', methods=['POST'])
def add_movie():
    
    data = request.get_json()
    username = data.get('username')
    movie_name = data.get('movie_name')
    table = data.get('table')

    if not all([username, movie_name, table]) or (table != 'watchlist' and table != 'movies_watched'):
        return jsonify({'message': 'Veuillez fournir le username, le nom du film et un nom valide pour la table'}), 400

    try:
        cursor = mysql.get_db().cursor()
        # On récupère l'ID du user
        cursor.execute('SELECT id FROM users WHERE username = %s', (username))
        user_id = cursor.fetchone()

        # On récupère l'ID du film
        cursor.execute('SELECT id FROM movies WHERE name = %s', (movie_name))
        movie_id = cursor.fetchone()

        cursor.execute('INSERT INTO %s (user_id, movie_id) VALUES (%s, %s)',
                       (table, user_id, movie_id))
        mysql.get_db().commit()
        cursor.close()

        jsonify({'message': 'Film ajouté avec succès'}), 201
        

    except Exception as e:
        return jsonify({'message': str(e)}), 500


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
    movie_id = "123"  # Replace with the actual movie ID
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}"
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
    url = f"https://api.themoviedb.org/3/discover/movie?api_key={api_key}&with_genres={genre_id}"
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
