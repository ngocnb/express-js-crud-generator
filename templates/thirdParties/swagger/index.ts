import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import packageInfo from '../../../package.json';
import env from '../../utils/config/env';
import logger from '../../utils/config/logger';

const optionSwagger: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      version: packageInfo.version,
      title: 'Api Document', //TODO - need display name project "<ProjectName>"
      description: 'This is document api', //TODO - need display name project "This is document api for <ProjectName>"
    },
    servers: [
      // {
      //   url: `http://localhost:8888/api`,
      //   description: 'Local',
      // },
      {
        url: `http://54.206.80.65/api`, //TODO - need change IP server
        description: 'Dev Server',
      },
      // {
      //   url: `http://127.0.0.2/api`, //TODO - need change IP server
      //   description: 'Stag Server',
      // },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(optionSwagger);

const swaggerApiDocs = (app: Express) => {
  // Swagger UI
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //TODO - Protect docs

  // Swagger Json
  app.get('/api/docs.json', (req: Request, res: Response) => {
    res.json(swaggerSpec);
  });

  logger.info(`Swagger api docs available at ${env.BASE_URL}/api/docs`);
};

export default swaggerApiDocs;
