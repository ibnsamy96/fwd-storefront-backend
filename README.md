# Storefront Backend

## Description

This Project is the second project in the [egFWD](https://egfwd.com/) initiative (full-stack nanodegree).
It presents the basic functionalities for a company web app that is used to showcase company's product ideas.

## Prerequisites

You must have these installed on your machine:

- [node](https://nodejs.org/en/download/) v12 or higher.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v6 or higher.
- [PostgreSQL](https://www.postgresql.org/download/) v14 or higher.

## Instructions

After downloading the project here's a couple of things you should do in order to run it:

- Head to the project folder through your terminal and run these commands

1. install packages

```shell
npm i
```

2. open the **psql shell** on your machine and apply its default configurations  
   create your user with superuser privileges and create the two databases for development and testing purposes

```shell
CREATE USER fwd_store_user WITH PASSWORD 'password@123' SUPERUSER;
```

```shell
CREATE DATABASE fwd_store_db OWNER fwd_store_user ENCODING UTF8;
CREATE DATABASE fwd_store_test_db OWNER fwd_store_user ENCODING UTF8;
```

3. rename ".env-example" file with ".env" and change your database info and the other secret info

```bash
# APP Variables
ENV=dev
PORT=3000
APP_NAME='Storefront Backend'

# Database Variables
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=fwd_store_user
POSTGRES_PASSWORD=password@123
POSTGRES_DB=fwd_store_db
POSTGRES_TEST_DB=fwd_store_test_db

# Secret Tokens
JWT_TOKEN=secret
SALT_ROUNDS=10
BCRYPT_PASSWORD=password@123
```

4. run db-migrate to setup your database **on port 5432 as declared in .env**

```shell
db-migrate up
```

5. to run project will be running **on localhost port 3000**

```shell
npm start
```

- Then open your browser and go to `http://localhost:3000` or with the written port in your .env file.

## API Documentation

1- Product:

    You can add new Product
    example:
    (POST) http://localhost:3000/products with authorization token
    will return the new added product
    Body: {
    name: 'new product',
    price: 250,
    category: 'product type'
    }

    You can show Product by id
    example:
    (GET) http://localhost:3000/products/{product_id}
    will return the product with id (product_id)

    You can show all Products
    example:
    (GET) http://localhost:3000/products
    will return all products

2- User:

    You can add new User
    example:
    (POST) http://localhost:3000/users
    Body: {
    firstname: "firstName",
    lastname: "lastName" ,
    password: "password"
    }
    will return the assigned token

    You can show user by id with authorization token
    example:
    (GET) http://localhost:3000/users/{user_id}
    will return the user with id (user_id)

    You can show all users with authorization token
    example:
    (GET) http://localhost:3000/users
    will return all users

    You can show user's orders with authorization token
    example:
    (GET) http://localhost:3000/users/{user_id}/orders with authorization token
    will return all user's orders with id (user_id)

3- Order:

    You can add new order with authorization token
    example:
    (POST) http://localhost:3000/orders with authorization token
    will return the new added order
    Body: {
    status: 'active',
    user_id: 1
    }

## Data Schema

#### Product

- id
- name
- price
- category

#### User

- id
- first_name
- last_name
- password

#### Orders

- id
- user_id
- status of order (active or complete)
- id of each product in the order
- quantity of each product in the order
