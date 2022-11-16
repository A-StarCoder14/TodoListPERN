CREATE DATABASE pern_todo;

CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

