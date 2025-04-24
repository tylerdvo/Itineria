const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Itinera API',
      version: '1.0.0',
      description: 'API for Itinera travel assistant application',
      contact: {
        name: 'API Support',
        email: 'support@itinera.com'
      }
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API V1'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    './routes/*.js',
    './models/*.js'
  ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerDocs)
};