import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'URL Shortener API',
      version: '1.0.0',
      description: 'API de raccourcissement d\'URLs',
    },
    servers: [
      {
        url: `http://localhost:${process.env.API_PORT}`,
        description: 'Serveur de développement',
      }
    ],
    tags: [
      {
        name: 'URLs',
        description: 'Endpoints de gestion des URLs'
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const specs = swaggerJsdoc(options);