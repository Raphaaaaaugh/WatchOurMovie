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

-- Insert sample users data
INSERT INTO users (id, name, firstname, password, like_adult, favorite_genres, favorite_runtime, favorite_period)
VALUES
    (1, 'User1', 'John', 'pwd', 0, 'Action', 120, '1900-05-25'),
    (2, 'User2', 'Jane', 'pwd', 1, 'Sex', 80, '2000-05-25'),
    (3, 'User1', 'Jax', 'pwd', 0, 'Horror', 120, '1970-05-25'),
    (4, 'User1', 'Jean', 'pwd', 0, 'Action', 120, '1995-05-25'),
    (5, 'User1', 'Darius', 'pwd', 0, 'Comedy', 120, '2002-05-25'),
    (6, 'User1', 'Garen', 'pwd', 0, 'Sex', 120, '2008-05-25'),
    (7, 'User1', 'Pornn', 'pwd', 0, 'Action', 120, '2050-05-25');

-- Insert sample movies data
INSERT INTO movies (title, adult, release_date, genre_ids, runtime, original_title, original_language, backdrop_path, popularity, vote_count, video, vote_average)
VALUES
    ('Movie1', 0, '2023-01-01', '1,2,3', '120', 'Movie1', 'English', '/path/to/backdrop1.jpg', 7.5, 1000, 0, 7.2),
    ('Movie2', 1, '2024-02-15', '4,5,6', '95', 'Movie2', 'French', '/path/to/backdrop2.jpg', 8.2, 1500, 0, 8.5),
    ('The Godfather', 2, '2024-02-15', '4,5,6', '95', 'Movie2', 'French', '/path/to/backdrop2.jpg', 8.2, 1500, 0, 8.5);

-- Insert associations between users and movies
INSERT INTO user_movie (user_id, movie_id)
VALUES
    (1, 1),  -- John (User1) has seen Movie1
    (2, 1),  -- Jane (User2) has seen Movie1
    (2, 2),  -- Jane (User2) has seen Movie2
    (1, 3);

-- Genre IDS