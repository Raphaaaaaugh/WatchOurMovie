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
    runtime VARCHAR(3),
    original_title VARCHAR(255) NOT NULL,
    original_language VARCHAR(50) NOT NULL,
    backdrop_path VARCHAR(255) NOT NULL,
    popularity FLOAT,
    vote_count INT,
    video INT,
    vote_average FLOAT
);

-- Insert sample movies data

-- Create a table for users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(20) NOT NULL,
    secret_question TEXT,
    secret_answer TEXT,
    seen_movies_list TEXT,
    favorite_genres VARCHAR(10),
    favorite_period VARCHAR(10),
    favorite_runtime VARCHAR(10),
    like_adult INT
);

-- Insert sample users data
INSERT INTO users (id, name, firstname, password, seen_movies_list, like_adult)
VALUES
    (1, 'User1', 'John', 'pwd', 'Movie1,Movie2', 0),
    (2, 'User2', 'Jane', 'pwd', 'Movie3', 1);
