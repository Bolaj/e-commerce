# Product Management API

This is a backend application built with Node.js, Express, and MongoDB. It provides APIs for managing products (Create, Read, Update, Delete) and user authentication (login). Only authenticated users can add, update, or delete products. The project uses JWT (JSON Web Tokens) for authentication and Mongoose for database operations.

## Features

- User Registration and Authentication
- CRUD operations for products
- Middleware to protect routes
- Integration with MongoDB

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/product-management-api.git
   cd product-management-api
   ```
2. Install dependencies:
    ```
    npm install
    ```
3. Create a .env file in the root directory with the following content:
    ```
    MONGO_URI=mongodb:.....
    JWT_SECRET=your_jwt_secret
    ```
4. Start the server:
    ```
    npm run dev
    ```

API Endpoints
Authentication
Register: POST /api/auth/register

Request Body:
```
{
  "username": "your_username",
  "password": "your_password",
  "email": "your_email"
}
```
Response:
```
{
  "token": "your_jwt_token"
}
```
Login: POST /api/auth/login

Request Body:
```
{
  "email": "your_email",
  "password": "your_password"
}
```
Response:
```
{
  "token": "your_jwt_token"
}
```
Products
Create Product: POST /api/products (Protected)

Request Header:

Authorization: your_jwt_token
Request Body:
```
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "imageURL": "..link../image.jpg"
}
```

Response:

```{
  "_id": "product_id",
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "imageURL": "..link../image.jpg",
  "createdBy": "user_id",
  "__v": 0
}
```
Get All Products: GET /api/products

Response:

```
[
  {
    "_id": "product_id",
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "imageURL": "..link../image.jpg",
    "createdBy": {
      "_id": "user_id",
      "username": "username",
      "email": "email"
    }
  }
]
```
Get Product by ID: GET /api/products/:id

Response:
```
{
  "_id": "product_id",
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "imageURL": "..link../image.jpg",
  "createdBy": {
    "_id": "user_id",
    "username": "username",
    "email": "email"
  }
}
```
Update Product: PUT /api/products/:id (Protected)

Request Header:

Authorization: your_jwt_token
Request Body:
```
{
  "name": "Updated Product Name",
  "description": "Updated Product Description",
  "price": 150,
  "imageURL": "..link../updated_image.jpg"
}
```
Response:
```
{
  "_id": "product_id",
  "name": "Updated Product Name",
  "description": "Updated Product Description",
  "price": 150,
  "imageURL": "..link../updated_image.jpg",
  "createdBy": "user_id",
  "__v": 0
}
```
Delete Product: DELETE /api/products/:id (Protected)

Request Header:

Authorization: your_jwt_token
Response:

```
{
  "msg": "Product Deleted successfully"
}
```
Middleware
auth.js: Middleware to verify JWT and protect routes.

```
const jwt = require('jsonwebtoken');
```
# e-commerce
