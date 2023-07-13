# Healthy-food REST API

## Overview 
REST API Server for healthy-food-app. This application contains endpoints for every user actions. Users may register with user information, email and password, which allows them to create their own recipes and products. Creators can also edit and delete their own sharings at any time.

## Technical Details 
The application uses:
- ExpressJS framework for the server.
- Bcrypt library for the password hashing.
- Cors library for the Cross-Origin Resource Sharing restrictions.
- JsonWebToken library for the user authentication access token.
- Mongoose library for the database communication.
- The use the server you have to run "npm install" for the required technologies.
- To start the server in development mode, you have to run "npm start".

## Application Endpoints
# User authentication
- Base URL: http://localhost:3030/users

- /register - send POST request to the endpoint with required data. All fields must be filled with correct information. The server responds with following data: _id, email, firstName, lastName and accessToken to perform authorized requests.

- /login - send POST request to the endpoint with required data (email and password). Both must be filled with correct information. The server responds with following data: _id, email, firstName, lastName and accessToken to perform authorized requests.

- /logout - send authorized GET request to the endpoint with special header - [X-Authorization] containing the access token of the current user.

# Recipe operations
-Base URL: http://localhost:3030/recipes

- /create - send authorized POST request to the endpoint with required data. All fields must be filled with correct information. The server responds with the newly created recipe.

- /all - send GET request to the endpoint and it will return all recipes in the system.

- /id - send GET request to the endpoint and it will return the recipe with the given id.

- /profile/:ownerId send GET request to the endpoint and it will return an array with the created recipes by the given owner id.

- /author/:userId - send GET request to the endpoint and it will return the author with an array containing his populated saved recipes.

- /edit/:recipeId - send authorized PUT request to the endpoint with the correct data. It replaces old data with the newly given and return object containing to the client.

- /delete/:recipeId - send authorized DELETE request to the endpoint, it will delete the recipe from the system and return the deleted recipe as object.

- /save/:recipeId - send authorized POST request to the endpoint, containing the userId in the body, the recipe will be added to the users saved recipes and it will return an array containing all saved recipes of the current user.

- /save/:userId - send GET request to the endpoint and it will return all saved recipes of the current user.

# Products operations
- BaseUrl: http://localhost:3030/products.

- /create - send authorized POST request to the endpoint with required data. All fields must be filled with correct information. The server responds with the newly created product.

- /all - send GET request to the endpoint and it will return all products in the system.

- /:productId - send GET request to the endpoint and it will return the product with the given id.

- /profile/:ownerId send GET request to the endpoint and it will return an array with the created products by the given owner id.

- /author/:userId - send GET request to the endpoint and it will return the author of the product.

- /edit/:productId - send authorized PUT request to the endpoint with the correct data. It replaces old data with the newly given and return object containing the product to the client.

- /delete/:productId - send authorized DELETE request to the endpoint, it will delete the product from the system and return the deleted product as object.
