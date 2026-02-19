require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const moviesRoutes = require('./routes/movies');
const corsMiddleware = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const logger = require('./config/logger');
const swaggerSpecs = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(corsMiddleware);

// Use morgan for HTTP request logging, stream to winston
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Rate limiter for API
app.use('/v1', rateLimiter);

app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/v1/movies', moviesRoutes);

app.get('/', (req, res) => {
    res.send('API is running. Welcome to the Movie API.');
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    console.log(`Server is running on port ${PORT}`);
});
