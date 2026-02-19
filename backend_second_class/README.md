# Movie API

A RESTful API for managing movies and reviews, built with Express.js.

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env` file in the root directory (see `.env.example` or use defaults).
    ```
    PORT=3000
    NODE_ENV=development
    ```

3.  **Start the server**:
    ```bash
    npm run dev
    ```
    The server runs on `http://localhost:3000`.

## API Documentation

Swagger documentation is available at:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Features

-   **CRUD Operations**: Movies and Reviews.
-   **Security**: Helmet for headers, CORS enabled.
-   **Logging**: Morgan + Winston for request and error logging.
-   **Rate Limiting**: Limits requests to 100 per 15 minutes per IP.
-   **Architecture**: Layered (Routes, Controllers, Models, Middleware).

## Endpoints

### Movies

-   **GET /v1/movies**
    -   Fetch a list of movies.
    -   **Query Parameters**:
        -   `q`: Keyword search (title or description).
        -   `sort`: Sort by rating (`rating_asc` or `rating_desc`).
        -   `page`: Page number (default: 1).
        -   `limit`: Items per page (default: 10).
    -   **Response**: JSON object with pagination info and data array.

-   **GET /v1/movies/:id**
    -   Get a single movie by ID.

-   **POST /v1/movies**
    -   Create a new movie.
    -   **Body**:
        ```json
        {
          "title": "Movie Title",
          "description": "Description...",
          "rating": 8.5,
          "releaseDate": "2023-01-01"
        }
        ```

-   **PUT /v1/movies/:id**
    -   Update an existing movie.
    -   **Body**: Fields to update (title, description, rating, releaseDate).

-   **DELETE /v1/movies/:id**
    -   Delete a movie by ID.

### Reviews

-   **GET /v1/movies/:id/reviews**
    -   Get all reviews for a specific movie.

-   **POST /v1/movies/:id/reviews**
    -   Add a review to a movie.
    -   **Body**:
        ```json
        {
          "user": "Username",
          "content": "Review content...",
          "rating": 5
        }
        ```
