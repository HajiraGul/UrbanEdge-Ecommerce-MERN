# UrbanEdge-Ecommerce-MERN
This repository contains the source code for UrbanEdge, a stylish e-commerce platform built with Node.js, Express, and MongoDB, showcasing trendy clothing, footwear, and jewelry.
## Description

UrbanEdge is a comprehensive e-commerce web application built using Node.js, Express, and MongoDB. It offers a user-friendly platform for browsing and purchasing clothing, footwear, and jewelry. Features include user authentication, product catalog management, shopping cart functionality, and a contact form.

## Technologies Used

*   **Node.js:**  JavaScript runtime environment
*   **Express:** Web application framework for Node.js
*   **MongoDB:** NoSQL database for storing application data
*   **Mongoose:** ODM (Object Data Modeling) library for MongoDB
*   **EJS:** Templating engine for dynamic HTML generation
*   **bcrypt:** Library for password hashing
*   **express-session:** Middleware for managing user sessions
*   **HTML/CSS/JavaScript:** Frontend technologies 
*   **Font Awesome:** Icon library

## Features

*   **User Authentication:**
    *   User registration (signup) with input validation
    *   User login and logout
    *   Secure password hashing using bcrypt
    *   Session-based authentication
*   **Product Catalog:**
    *   Browse products by category (clothing, footwear, jewelry)
    *   Product listings with images, names, prices, and descriptions
    *   "Deal of the Day" featured products with countdown timers
    *   Product details pages with more information and "Add to Cart" functionality
*   **Shopping Cart:**
    *   Add products to the cart
    *   View and modify cart contents (update quantity, remove items)
    *   Calculate subtotal, discount, and total price
    *   Apply coupon codes for discounts
    *   Checkout process (simulated purchase)
*   **Contact Form:**
    *   User-friendly contact form for inquiries
    *   Stores contact messages in the database
*   **About Us Page:**  Provides information about the UrbanEdge team and mission.
*   **Responsive Design:**  The application is designed to work well on various screen sizes.

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd urbanedge
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    *   Create a `.env` file in the root directory.
    *   Add the following variables, replacing the values with your actual configuration:

    ```
    PORT=3001
    SESSION_SECRET=your_secret_session_key
    MONGODB_URI=mongodb://127.0.0.1:27017/your_database_name?directConnection=true
    ```
4.  **Start MongoDB:**

    *   Make sure you have MongoDB installed and running.  The default configuration assumes it's running on `mongodb://127.0.0.1:27017`.

5.  **Run the application:**

    ```bash
    npm start   # or npm run dev for development mode with nodemon
    ```

6.  **Access the application:**

    Open your web browser and go to `http://localhost:3001` (or the port you specified in your `.env` file).

## File Structure
```

urbanedge/
├── app.js # Main application file
├── db/ # Database connection setup
│ └── connection.js
├── models/ # Mongoose models for data schemas
│ └── Project.js
├── public/ # Static files (CSS, JavaScript, images)
│ ├── cart.css
│ ├── cart.js
│ ├── productdetails.css
│ ├── productdetails.js
│ ├── products.css
│ ├── products.js
│ ├── style.css
│ ├── styles.css
│ ├── styless.css
│ └── validation.js
├── routes/ # Express routes for handling requests
│ └── projectRoutes.js
├── views/ # EJS templates for rendering HTML
│ ├── about.html
│ ├── cart.html
│ ├── clothes.html
│ ├── clothesdetails.html
│ ├── contact.html
│ ├── home.html
│ ├── jewellery.html
│ ├── jewellerydetails.html
│ ├── login.html
│ ├── shoes.html
│ ├── shoesdetails.html
│ └── signup.html
├── .env # Environment variables (API keys, database credentials, etc.)
├── package.json # Project dependencies and scripts
└── README.md # This file
```


## Models (in `models/Project.js`)

*   **User:** Defines the schema for user accounts, including:
    *   `firstname` (String, required)
    *   `email` (String, required, unique, validated)
    *   `phone` (String, required, validated)
    *   `password` (String, required, minimum length)
    *   `repeatPassword` (String, not stored in the database, used for validation)
*   **Contact:** Defines the schema for contact form submissions:
    *   `name` (String, required)
    *   `email` (String, required)
    *   `message` (String, required)
    *   `createdAt` (Date, default: Date.now)
*   **CartItem:** Defines the schema for items in the shopping cart
    *   `name` (String, required)
    *   `price` (Number, required)
    *   `image` (String, required)
    *   `quantity` (Number, required, default: 1)

## Routes (in `routes/projectRoutes.js`)

*   `/signup` (GET, POST):  Handles user registration.
*   `/login` (GET, POST): Handles user login.
*   `/logout` (GET): Handles user logout.
*   `/` or `/home` (GET): Renders the home page.
*   `/contact` (GET, POST): Renders the contact form and handles form submissions.
*   `/about` (GET): Renders the about page.
*   `/shoes`, `/jewellery`, `/clothes` (GET):  Renders category pages.
*   `/cart` (GET): Renders the shopping cart page.
*   `/shoesdetails`, `/jewellerydetails`, `/clothesdetails` (GET): Renders product details pages.
*   `/api/cart` (GET, POST, PUT, DELETE): REST API endpoints for managing cart items.

## Environment Variables

The following environment variables must be set in the `.env` file:

*   `PORT`:  The port the server will listen on (e.g., `3001`).
*   `SESSION_SECRET`: A secret key used to sign the session ID cookie.  This should be a long, random string.
*   `MONGODB_URI`:  The connection string to your MongoDB database. (e.g., `mongodb://127.0.0.1:27017/urbanedge?directConnection=true`)

## Dependencies

This project relies on the following Node.js packages:

*   bcrypt
*   body-parser
*   dotenv
*   ejs
*   express
*   express-session
*   mongoose
*   nodemon (for development)

## Running in Development Mode

For development, you can use `nodemon` to automatically restart the server when changes are made:

```bash
npm run dev
```
## Deployment
To deploy this application, you'll need to provision a server, install Node.js and MongoDB, configure the environment variables, and start the application.

## Validation
* The client-side validation script, validation.js provides user with instant feedback.
* Form field: firstname required
* Form field: email is checked for special symbols , if @ and . present
* Form field: Phone is checked for 10 digit validation
* Form field: Password check for minimun 8 characters ,atleast one upper case , at least one digit and one special character

## Further Development
* Implement a real payment gateway.
* Add a product search feature.
* Implement product reviews and ratings.
* Add user profiles with order history and saved addresses.
* Implement an administrative interface for managing products and users.
* Implement testing (unit and integration tests).

## Author
* Hajira Gul     hajiragul.89@gmail.com
* Sajjal Khalil  sajjalkhalil4@gmail.com
