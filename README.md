# Market App Client

## Overview

The Market App Client is the frontend component of the Market App project, designed to provide a user-friendly interface for an e-commerce platform. It allows users to browse products, add items to their shopping cart, write product reviews, and track their orders. The client is built using React, Apollo Client, Styled Components, React Router, and Formik.

## Technologies

- **Frontend**: React, Styled Components, React Router, Formik, Apollo Client
- **State Management**: Apollo Client, React Context
- **Styling**: Styled Components, Glamor
- **Testing**: Jest, Enzyme, React Testing Library

## Features

- User authentication and authorization
- Product listing and search
- Image upload for products
- Shopping cart functionality
- Product reviews and ratings
- Order tracking
- Stripe integration for payments

## Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/OxiBo/market-place-client.git
   cd market-place-client

2. **Install dependencies:**

    ```sh
    npm install 
    ```
3. **Set up environment variables:**

Create a `.env` file in the root directory and add the necessary environment variables.

4. **Start the client:**
   ```sh
     npm start 
    ```
## Usage

1. **Register/Login**: Users can register and log in to the application.
2. **Browse Products**: Users can browse and search for products.
3. **Add to Cart**: Users can add products to their shopping cart.
4. **Checkout**: Users can proceed to checkout using Stripe for payment.
5. **Review Products**: Users can write reviews for products they have purchased.
6. **Track Orders**: Users can track their orders and view order history.


## Server Repository

For the server-side code, please check out the repository: [Market App Server](https://github.com/OxiBo/market-app-graphql-prisma)


## Maintenance

**Note**: This project is currently not maintained.
