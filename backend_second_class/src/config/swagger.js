const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie API',
            version: '1.0.0',
            description: 'A RESTful API for Movies and Reviews',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: [path.join(__dirname, '../routes/*.js')], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

module.exports = specs;
