const MovieModel = require('../models/movieModel');

const movieController = {
    getMovies: (req, res) => {
        let { q, sort, page, limit } = req.query;
        let results = [...MovieModel.getAll()];

        // 1. Keyword Search
        if (q) {
            const keyword = q.toLowerCase();
            results = results.filter(movie =>
                movie.title.toLowerCase().includes(keyword) ||
                movie.description.toLowerCase().includes(keyword)
            );
        }

        // 2. Sorting by Rating
        if (sort) {
            if (sort === 'rating_asc') {
                results.sort((a, b) => a.rating - b.rating);
            } else if (sort === 'rating_desc') {
                results.sort((a, b) => b.rating - a.rating);
            }
        }

        // 3. Pagination
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedResults = results.slice(startIndex, endIndex);

        res.json({
            page,
            limit,
            total: results.length,
            totalPages: Math.ceil(results.length / limit),
            data: paginatedResults
        });
    },

    getMovieById: (req, res) => {
        const movie = MovieModel.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    },

    createMovie: (req, res) => {
        const { title, description, rating, releaseDate } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const newMovie = MovieModel.create({
            title,
            description,
            rating: parseFloat(rating) || 0,
            releaseDate: releaseDate || new Date().toISOString().split('T')[0]
        });

        res.status(201).json(newMovie);
    },

    updateMovie: (req, res) => {
        const { id } = req.params;
        const { title, description, rating, releaseDate } = req.body;

        // Check if movie exists first to return 404
        const existingMovie = MovieModel.findById(id);
        if (!existingMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (rating !== undefined) updateData.rating = parseFloat(rating);
        if (releaseDate) updateData.releaseDate = releaseDate;

        const updatedMovie = MovieModel.update(id, updateData);

        // Should generally find it since we checked, but handle null return
        if (!updatedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(updatedMovie);
    },

    deleteMovie: (req, res) => {
        const deletedMovie = MovieModel.delete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully', movie: deletedMovie });
    },

    getReviews: (req, res) => {
        const reviews = MovieModel.getReviews(req.params.id);
        if (!reviews) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(reviews);
    },

    addReview: (req, res) => {
        const { user, content, rating } = req.body;

        // Check movie existence to ensure 404 instead of weird error or empty addition
        const movie = MovieModel.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        if (!user || !content || rating === undefined) {
            return res.status(400).json({ error: 'User, content, and rating are required' });
        }

        const newReview = MovieModel.addReview(req.params.id, {
            user,
            content,
            rating: parseFloat(rating)
        });

        res.status(201).json(newReview);
    }
};

module.exports = movieController;
