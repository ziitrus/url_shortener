import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      // Informations de base de votre API
      title: 'URL Shortener API',      // Changez selon votre préférence
      version: '1.0.0',                // Version de votre API
      description: 'API de raccourcissement d\'URLs', // Description de votre API
    },
    servers: [
      {
        // Définissez vos serveurs ici
        url: `http://localhost:${process.env.API_PORT}`,  // Adaptez selon votre configuration
        description: 'Serveur de développement',
      }
    ],
    // Vous pourrez ajouter des tags plus tard pour organiser vos endpoints
    tags: [
      {
        name: 'URLs',
        description: 'Endpoints de gestion des URLs'
      }
    ]
  },
  // Définissez où chercher la documentation dans les commentaires
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const specs = swaggerJsdoc(options);