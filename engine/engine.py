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
import math

def sortGenres(genres_list):
    # Count occurrences of each element in the list
    element_counts = Counter(genres_list)
    # Sort elements by count in descending order
    sorted_elements = sorted(element_counts, key=lambda x: element_counts[x], reverse=True)
    return sorted_elements

def sortPeriodes(date_list):
    # Convert the list of date strings to datetime objects
    date_objects = [datetime.strptime(date, "%Y-%m-%d") for date in date_list]
    # Find the oldest and newest dates
    oldest_date = min(date_objects)
    newest_date = max(date_objects)
    # Convert back to the "YYYY-MM-DD" format
    oldest_date_str = oldest_date.strftime("%Y-%m-%d")
    newest_date_str = newest_date.strftime("%Y-%m-%d")
    # Calculate the difference between the two dates
    date_difference = oldest_date_str - newest_date_str
    # Divide the difference by 2 to get the midpoint
    midpoint_difference = date_difference / 2
    # Add the midpoint difference to the first date
    average_date = newest_date_str + midpoint_difference
    return average_date

def sortRuntimes(top_runtimes):
    if not top_runtimes:
        return None  # Handle empty list case
    # Calculate the average of the list
    average_value = sum(top_runtimes) / len(top_runtimes)
    return average_value

def sortByGrade(final_list):
    final_list = sorted(final_list, key=lambda x: x['grade'], reverse=True)
    return final_list


def threeDimensionalAnalysis(movies_data, top_genres, perfect_period, perfect_runtime):
    final_list = []
    for movie in movies_data:
        # Grade every film attribute out of 10
        genre_grade = 0 
        period_grade, runtime_grade = 10
        for genre in top_genres:
            if genre in movie['genre_ids']:
                genre_grade += 10/3
        # Starting for the same cut of 5 years as the perfect movie release date, -1 per 5 years
        period_film = abs((perfect_period - movie['release_date']).days)
        while (period_film - 365) >= 0 and period_grade != 0:
            period_film -= 365
            period_grade -= 1
        # Starting for the perfect runtime, -1 per 5 minutes
        runtime_film = abs(perfect_runtime - movie['runtime'])
        while (runtime_film - 5) >= 0 and runtime_grade != 0:
            runtime_film -= 5
            runtime_grade -= 1
        # Average of grades gives an evaluation of the film
        overall_grade = (runtime_grade + period_grade + genre_grade)/3
        graded_film = [
            {
                'name': movie['title'],
                'grade': overall_grade
            }
        ]
        final_list.append(graded_film)
    sortByGrade(final_list)
    return final_list



def recommendationEngine(usernames):

    users = SELECT * FROM users WHERE name IN (usernames);
    
    # remove all seen movies and get best genres, check if someone not like sex, [-:+] period, avg runtime
    eliminated_movies = []
    top_genres = []
    top_periods = []
    top_runtimes = []
    adult_no = 0
    for user in users:
        seen_movies = parse user{seen_movies_list: string}
        for movie in seen_movies:
            eliminated_movies += movie
        user_top_genres = parse user{favorite_genres: string}
        for genre in user_top_genres:
            top_genres += genre
        top_runtimes += user{favorite_runtime: string}
        if user is like_adult:
            adult_no += 1
        # if only 1 user set his period, else mean make an intervall
        if len(users) != 1:
            top_periods += user{favorite_period: string}
        else :
            top_periods = [user{favorite_period: string reduced by 5 years}, user{favorite_period: string buffed by 5 years}]

    # the best genres are the one with the most duplicates
    top_genres = sortGenres(top_genres)
    # the best runtime is the average of the newest and oldest
    perfect_period = sortPeriodes(top_periods)
    # the best runtime is the average of the favourites
    perfect_runtime = sortRuntimes(top_runtimes)

    # get movies by genres
    movies_data = []
    for genre in top_genres[:3]:
        # For 3 top genres, then scoop all
        url = f"https://api.themoviedb.org/3/discover/movie"
        params = {
            'api_key': "5cad553ca21b1db5886498f3843a8264",
            'with_genres': genre,
        }
        response = requests.get(url, params=params)
        if response.status_code == 200:
            movies_result = response.json()['results']
            # Extracting relevant information for each movie
            movies_info = [
                {
                    'name': movie['title'],
                    'release_date': movie['release_date'],
                    'genre': movie['genre_ids'],
                    'runtime': movie['runtime'],
                    'popularity': movie['popularity'],
                    'vote_count': movie['vote_count'],
                    'vote_average': movie['vote_average']
                }
                for movie in movies_result
            ]
            movies_data += movies_info
        else:
            print(f"Error: {response.status_code}")
            return None
    
    # Cut all adults movies if children
    if adult_no != 0:
        for movie in movies_data:
            if movie is adult:
                movies_data.remove(movie)
            elif movie in eliminated_movies:
                movies_data.remove(movie)

    movies_data = threeDimensionalAnalysis(movies_data, top_genres, perfect_period, perfect_runtime)

    return(movies_data[:10])

