# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
  '/products' [Get]
- Show
  '/products/:id' [Get]
- Create
  '/products' [token required] [Post]
  (body: {name: string, price:number, category:string})

#### Users

- Index
  '/users' [token required] [Get]
- Show
  '/users/:id' [token required] [Get]
- Create '/user' [Post]
  (body:{firstname: string, lastname: string, password: string})
- Current Order by user
  '/users/:user_id/orders' [token required] [Get]

#### Orders

- Create Order
  '/orders' [token required] [post] (body:{user_id: number, status: 'active' | 'complete', order_products: {product_id:number, quantity:number}[]})

## Data Shapes

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
