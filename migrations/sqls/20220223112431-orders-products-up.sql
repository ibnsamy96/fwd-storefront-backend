CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id)
);