BEGIN;
DROP TABLE IF EXISTS users, advice CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL 
);
CREATE TABLE advice(
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES USERS(id)
);

INSERT INTO users (username, first_name,last_name, email, password) VALUES
('Aymancoo','Ayman','alqoqa', 'aal@gmail.com','123456789'),
('khadercoo','kaka', 'mortaja', 'ka@gmail.clm', '987654321');

COMMIT;