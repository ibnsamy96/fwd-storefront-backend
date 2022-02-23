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

```
npm i
```

2. rename ".env-example" file with ".env" and change your database info and the other secret info

3. run db-migarte to setup your database on port 5432 as declared in .env

```
db-migrate up
```

4. to run project will be running on localhost port 3000

```
npm start
```

5. to run unit test

```
npm test
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
