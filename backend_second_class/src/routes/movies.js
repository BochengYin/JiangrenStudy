const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

// Movies Routes

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the movie
 *         title:
 *           type: string
 *           description: The movie title
 *         description:
 *           type: string
 *           description: The movie description
 *         rating:
 *           type: number
 *           description: The movie rating
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: The movie release date
 *         reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Review'
 *     Review:
 *       type: object
 *       required:
 *         - user
 *         - content
 *         - rating
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the review
 *         user:
 *           type: string
 *           description: The user who wrote the review
 *         content:
 *           type: string
 *           description: The review content
 *         rating:
 *           type: number
 *           description: The review rating
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date
 */

/**
 * @swagger
 * /v1/movies:
 *   get:
 *     summary: Returns the list of all movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Keyword search (title or description)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [rating_asc, rating_desc]
 *         description: Sort by rating
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: The list of the movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movie'
 *                 total:
 *                   type: integer
 */
router.get('/', movieController.getMovies);

/**
 * @swagger
 * /v1/movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     responses:
 *       200:
 *         description: The movie description
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: The movie was not found
 */
router.get('/:id', movieController.getMovieById);

/**
 * @swagger
 * /v1/movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: The movie was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Missing parameters
 */
router.post('/', movieController.createMovie);

/**
 * @swagger
 * /v1/movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The movie was updated
 *       404:
 *         description: The movie was not found
 */
router.put('/:id', movieController.updateMovie);

/**
 * @swagger
 * /v1/movies/{id}:
 *   delete:
 *     summary: Remove the movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     responses:
 *       200:
 *         description: The movie was deleted
 *       404:
 *         description: The movie was not found
 */
router.delete('/:id', movieController.deleteMovie);

// Reviews Routes

/**
 * @swagger
 * /v1/movies/{id}/reviews:
 *   get:
 *     summary: Get reviews for a movie
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     responses:
 *       200:
 *         description: The list of reviews for the movie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: The movie was not found
 */
router.get('/:id/reviews', movieController.getReviews);

/**
 * @swagger
 * /v1/movies/{id}/reviews:
 *   post:
 *     summary: Add a review to a movie
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: The review was created
 *       400:
 *         description: Missing parameters
 *       404:
 *         description: The movie was not found
 */
router.post('/:id/reviews', movieController.addReview);

module.exports = router;
