# E-commerce API

This is a RESTful API for an e-commerce application built with Node.js, Express, and Sequelize. The API allows users to manage products, categories, and tags, providing endpoints for creating, reading, updating, and deleting data.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Products](#products)
  - [Categories](#categories)
  - [Tags](#tags)
- [Usage](#usage)
- [License](#license)

## Features

- Create, read, update, and delete products
- Associate products with categories and tags
- Manage product tags
- Retrieve products with their associated category and tag data

## Technologies

- Node.js
- Express
- Sequelize (for ORM)
- PostgreSQL (as the database)
- dotenv (for environment variables)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ecommerce-api.git
   cd ecommerce-api

2. Install the required packages:

   
   ```bash
   npm install
   Create a .env file in the root directory and add your database configuration:
   - DB_NAME=ecommerce_db
   - DB_USER=your_username
   - DB_PASSWORD=your_password
   Run the database migrations:
   - npx sequelize-cli db:migrate 
   Start the server:
   - npm start


## API Endpoints
### Products
- GET /api/products - Retrieve all products
- GET /api/products/:id - Retrieve a single product by ID
- POST /api/products - Create a new product
- PUT /api/products/:id - Update a product by ID
- DELETE /api/products/:id - Delete a product by ID

### Categories
- GET /api/categories - Retrieve all categories
- GET /api/categories/:id - Retrieve a single category by ID
- POST /api/categories - Create a new category
- PUT /api/categories/:id - Update a category by ID
- DELETE /api/categories/:id - Delete a category by ID

### Tags
- GET /api/tags - Retrieve all tags
- GET /api/tags/:id - Retrieve a single tag by ID
- POST /api/tags - Create a new tag
- PUT /api/tags/:id - Update a tag by ID
- DELETE /api/tags/:id - Delete a tag by ID

## Usage
You can use tools like Postman or cURL to interact with the API endpoints. Make sure to set the appropriate HTTP method and provide any necessary request body in JSON format.

## Example Request
To create a new product:

json
Copy code
POST /api/products
{
  "product_name": "Basketball",
  "price": 200.00,
  "stock": 3,
  "tagIds": [1, 2]
}

## License
This project is licensed under the MIT License - see the LICENSE file for details.

