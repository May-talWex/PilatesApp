const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

// Load the YAML file
const swaggerDocument = require('yamljs').load(path.join(__dirname, '../docs/swagger.yaml'));

// Swagger JSDoc options
const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Pilates App API',
            version: '1.0.0',
            description: 'A comprehensive API for Pilates instructors to get exercise modifications based on student injuries.',
        },
    },
    apis: ['./routes/*.js', './server.js'], // paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

// Custom CSS for better styling
const customCss = `
  .swagger-ui .topbar { display: none; }
  .swagger-ui .info .title { color: #2c3e50; }
  .swagger-ui .scheme-container { background: #f8f9fa; padding: 20px; border-radius: 8px; }
`;

const swaggerOptions = {
    customCss,
    customSiteTitle: 'Pilates App API Documentation',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'list',
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        tryItOutEnabled: true,
    },
};

module.exports = {
    swaggerDocument,
    swaggerUi,
    swaggerOptions,
    specs
};

