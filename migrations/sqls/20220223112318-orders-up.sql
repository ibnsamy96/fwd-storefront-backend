CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    status VARCHAR(10) CHECK (status IN('active', 'complete'))
);