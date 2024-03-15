CREATE USER 'api'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'api'@'%';

CREATE DATABASE WOM;
USE WOM;

-- Create a table for movies
CREATE TABLE movies (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    genre VARCHAR(50),
    duration INT
);

-- Insert sample movies data
INSERT INTO movies (id, name, genre, duration)
VALUES
    (1, 'Movie1', 'Action', 120),
    (2, 'Movie2', 'Drama', 150),
    (3, 'Movie3', 'Comedy', 110);

-- Create a table for users
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    -- Creating a relationship with movies table
    seen_movies_list VARCHAR(255)
);

-- Insert sample users data
INSERT INTO users (id, name, firstname, seen_movies_list)
VALUES
    (1, 'User1', 'John', 'Movie1,Movie2'),
    (2, 'User2', 'Jane', 'Movie3');
