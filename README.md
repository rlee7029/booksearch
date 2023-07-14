# booksearch

This app demonstrates the use of Apollo Server and GraphQL to fetch and modify data, replacing the existing RESTful Google Books API search engine.

## Features

- Use Apollo Server and GraphQL to handle data fetching and mutations
- Authentication middleware modified to work in the context of a GraphQL API
- Apollo Provider for communication with the Apollo Server

## Technologies Used

- Node.js
- Express.js
- Apollo Server
- GraphQL
- Authentication Middleware
- Apollo Client
- MongoDB database
- React (for client-side)


## Installation

1. Clone the repository:

2. Install dependencies for server and client:

   ```
   cd server
   npm install
   
   cd client
   npm install
   
   ```

3. Set up environment variables:

   - update the environment variables in the `.env` file of server and client directory.
   

4. Start the server:

   ```
   npm start
   ```
The server should now be running at `http://localhost:3001`. 
 
5. Start the client