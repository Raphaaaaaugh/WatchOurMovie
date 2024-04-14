# Eliminate seen movies for N people
# Find the most shared genders, in order of weight
# If people p NOT like_adult, eliminate all adult movies
# Select the top 3 heaviest genres
# Repeat process for period then runtime
# Sort by vote_count and vote_average simultaneously

import requests
from collections import Counter
from datetime import datetime
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np
import json
import math
from enum import Enum

from fastapi import FastAPI

app = FastAPI()

class Genre(Enum):
    Action = 28
    Adventure=12
    Animation=16
    Comedy=35
    Crime=80
    Documentary=99
    Drama=18
    Family=10751
    Fantasy=14
    History=36
    Horror=27
    Music=10402
    Mystery=9648
    Romance=10749
    Science_Fiction=878
    TV_Movie=10770
    Thriller=53
    War=10752
    Western=37


@app.post("/process_data")
async def process_data(data: dict):
    return recommendationEngine(data['users'], data['seen_movies'], data['top_movies'])


def sortGenres(genres_list):
    # Count occurrences of each element in the list
    element_counts = Counter(genres_list)
    # Sort elements by count in descending order
    sorted_elements = sorted(element_counts, key=lambda x: element_counts[x], reverse=True)
    return sorted_elements

def sortPeriodes(date_list):
    dates = [datetime.strptime(date_str, '%Y-%m-%d').date() for date_str in date_list]
    oldest_date = min(dates)
    newest_date = max(dates)
    average_date = oldest_date + (newest_date - oldest_date) / 2
    return average_date

def sortRuntimes(top_runtimes):
    if not top_runtimes:
        return 100  # Handle empty list case
    # Calculate the average of the list
    average_value = sum(top_runtimes) / len(top_runtimes)
    return int(average_value)

def sortByGrade(final_list):
    sorted_movies = sorted(final_list, key=lambda x: x["grade"], reverse=True)
    return sorted_movies


def threeDimensionalAnalysis(movies_data, top_genres, perfect_period, perfect_runtime):
    final_list = []
    for movie in movies_data:
        # Grade every film attribute out of 10
        genre_grade = 0 
        period_grade = 10
        runtime_grade = 10
        # Convert numbers to corresponding Genre classes
        movie_genres = [genre.name for genre in Genre if genre.value in movie['genre_ids']]
        for genre in top_genres:
            if genre in movie_genres:
                genre_grade += 10/3

        # Starting for the same cut of 5 years as the perfect movie release date, -1 per 5 years
        datetime_object = datetime.strptime(movie['release_date'], '%Y-%m-%d')
        date_object = datetime_object.date()
        diff = (date_object - perfect_period).days
        while (diff - 365) >= 0 and period_grade != 0:
            diff -= 365
            period_grade -= 1

        # Starting for the perfect runtime, -1 per 5 minutes
        if 'runtime' in movie:
            runtime_film = abs(perfect_runtime - movie['runtime'])
            while (runtime_film - 5) >= 0 and runtime_grade != 0:
                runtime_film -= 5
                runtime_grade -= 1
        else: 
            runtime_grade == 3

        # Average of grades gives an evaluation of the film
        overall_grade = (runtime_grade + period_grade + genre_grade)/3
        graded_film = {
            'name': movie['title'],
            'release_date': movie['release_date'],
            'original_title': movie['original_title'],
            'original_language': movie['original_language'],
            'backdrop_path': movie['backdrop_path'],
            'grade': overall_grade
        }
        final_list.append(graded_film)
    final_list = sortByGrade(final_list)
    return final_list



def recommendationEngine(users, seen_films, top_films):
    # remove all seen movies and get best genres, check if someone not like sex, [-:+] period, avg runtime
    seen_titles = []
    top_unseen_movies = []
    top_genres = []
    top_periods = []
    top_runtimes = []
    adult_no = 0


    for user in users:
        top_genres.append(user['favorite_genres'])
        top_runtimes.append(user['favorite_runtime'])
        if user['like_adult'] != 0:
            adult_no += 1
        # if only 1 user set his period, else mean make an intervall
        top_periods.append(user['favorite_period'])

    for film in seen_films:
        seen_titles.append(film['title'])

    for film in top_films:
        if not(film['adult'] == 'true' and adult_no == 0):
            top_unseen_movies.append(film['title'])

    top_films = [movie for movie in top_films if movie.get('title') not in seen_titles]

    # the best genres are the one with the most duplicates
    top_genres = sortGenres(top_genres)
    # the best runtime is the average of the newest and oldest
    perfect_period = sortPeriodes(top_periods)
    # the best runtime is the average of the favourites
    perfect_runtime = sortRuntimes(top_runtimes)
    
    movies_data = threeDimensionalAnalysis(top_films, top_genres, perfect_period, perfect_runtime) 

    return movies_data

 
