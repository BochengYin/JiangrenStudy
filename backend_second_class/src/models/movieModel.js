const { v4: uuidv4 } = require('uuid');
const { movies } = require('../data/db');

const MovieModel = {
    getAll: () => {
        return movies;
    },

    findById: (id) => {
        return movies.find(m => m.id === id);
    },

    create: (movieData) => {
        const newMovie = {
            id: uuidv4(),
            ...movieData,
            reviews: []
        };
        movies.push(newMovie);
        return newMovie;
    },

    update: (id, updateData) => {
        const index = movies.findIndex(m => m.id === id);
        if (index === -1) return null;

        movies[index] = { ...movies[index], ...updateData };
        return movies[index];
    },

    delete: (id) => {
        const index = movies.findIndex(m => m.id === id);
        if (index === -1) return null;

        const deletedMovie = movies.splice(index, 1);
        return deletedMovie[0];
    },

    addReview: (movieId, reviewData) => {
        const movie = movies.find(m => m.id === movieId);
        if (!movie) return null;

        const newReview = {
            id: uuidv4(),
            ...reviewData,
            createdAt: new Date().toISOString()
        };
        movie.reviews.push(newReview);
        return newReview;
    },

    getReviews: (movieId) => {
        const movie = movies.find(m => m.id === movieId);
        return movie ? movie.reviews : null;
    }
};

module.exports = MovieModel;
