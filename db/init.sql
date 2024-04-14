CREATE USER 'api'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'api'@'%';

CREATE DATABASE WOM;
USE WOM;

-- Create a table for movies
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    adult INT,
    release_date VARCHAR(10) NOT NULL,
    genre_ids TEXT,
    runtime INT,
    original_title VARCHAR(255) NOT NULL,
    original_language VARCHAR(50) NOT NULL,
    backdrop_path VARCHAR(255) NOT NULL,
    popularity FLOAT,
    vote_count INT,
    video INT,
    vote_average FLOAT
);

-- Create a table for users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    secret_question TEXT,
    secret_answer TEXT,
    -- seen_movies_list TEXT,
    favorite_genres VARCHAR(10),
    favorite_runtime INT,
    favorite_period VARCHAR(20),
    like_adult INT
);

-- Create a table to represent the many-to-many relationship between users and movies
CREATE TABLE user_movie (
    user_id INT,
    movie_id INT,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);