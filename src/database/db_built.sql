BEGIN;
DROP TABLE IF EXISTS users, advice CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
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

INSERT INTO users (first_name,last_name, email, password) VALUES
('Ayman','alqoqa', 'aal@gmail.com','$2b$05$JuAePX0DJGli25ym/0qwkeYvdDPkFqLLcLdKdmi2dBeUw17x5Xkce'),
('kaka', 'mortaja', 'ka@gmail.clm', '$2b$05$cbGbq2oArni6CR0Xisq7vOhefLcBt3Uiot3FPtQVwsB7m8HhdJ/8a');

COMMIT;