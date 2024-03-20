-- Création de l'utilisateur et octroi des privilèges
CREATE USER 'api'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'api'@'%';

-- Création de la base de données et utilisation de celle-ci
CREATE DATABASE WOM;
USE WOM;

-- Création d'une table pour les films
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    genre VARCHAR(50),
    duration INT
);

-- Insertion de données d'exemple pour les films
INSERT INTO movies (name, genre, duration)
VALUES
    ('Movie1', 'Action', 120),
    ('Movie2', 'Drama', 150),
    ('Movie3', 'Comedy', 110);

-- Création d'une table pour les utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login_str VARCHAR(255) NOT NULL,
    password_str VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    movies_count INT
);

-- Insertion de données d'exemple pour les utilisateurs
INSERT INTO users (login_str, password_str, username, firstname, lastname, movies_count)
VALUES
    ('root', 'root', 'admin', 'Jean', 'Clenche', 3),
    ('Jane', 'password', 'Jane', 'Doe', 0);

-- Création d'une table pour les genres
CREATE TABLE genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

-- Insertion de données d'exemple pour les genres
INSERT INTO genres (name)
VALUES
    ('Action'),
    ('Drama'),
    ('Comedy'),
    ('Fantasy');

-- Création d'une table de liaison pour les préférences de genre des utilisateurs
CREATE TABLE user_genre_preferences (
    user_id INT,
    genre_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

-- Création d'une table de liaison pour les genres des films
CREATE TABLE movie_genre (
    movie_id INT,
    genre_id INT,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

-- Création d'une table de liaison pour les films regardés par les utilisateurs
CREATE TABLE movies_watched (
    user_id INT,
    movie_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Création d'une table de liaison pour la liste de lecture des utilisateurs
CREATE TABLE watchlist (
    user_id INT,
    movie_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Insertion de données d'exemple dans la table user_genre_preferences
INSERT INTO user_genre_preferences (user_id, genre_id)
VALUES
    (1, 1),  -- Utilisateur 1 préfère Action
    (1, 2),  -- Utilisateur 1 préfère Drama
    (2, 3);  -- Utilisateur 2 préfère Comedy

-- Insertion de données d'exemple dans la table movie_genre
INSERT INTO movie_genre (movie_id, genre_id)
VALUES
    (1, 1),  -- Film 1 est de genre Action
    (2, 2),  -- Film 2 est de genre Drama
    (3, 3);  -- Film 3 est de genre Comedy

-- Insertion de données d'exemple dans la table movies_watched
INSERT INTO movies_watched (user_id, movie_id)
VALUES
    (1, 1),  -- Utilisateur 1 a regardé le film 1
    (1, 2),  -- Utilisateur 1 a regardé le film 2
    (2, 1),  -- Utilisateur 2 a regardé le film 1
    (2, 3);  -- Utilisateur 2 a regardé le film 3

-- Insertion de données d'exemple dans la table watchlist
INSERT INTO watchlist (user_id, movie_id)
VALUES
    (1, 3),  -- Utilisateur 1 a ajouté le film 3 à sa liste de lecture
    (2, 2);  -- Utilisateur 2 a ajouté le film 2 à sa liste de lecture
