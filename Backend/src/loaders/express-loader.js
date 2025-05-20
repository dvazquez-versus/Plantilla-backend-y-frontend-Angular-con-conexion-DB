import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import router from '../routes/index.js';
import { errorMiddleware } from '../middlewares/error-middleware.js';
import { morganMiddleware } from '../config/morgan.js';
import { swaggerDoc } from '../openapi/index.js';

export default function (server) {
  // Whitelist de orígenes permitidos
  const whitelist = [
    'http://localhost:4200',
    'https://board.versuselearning.com'
  ];
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };
   
  // justo después de server.use(express.json())
  server.use(cors(corsOptions));
  // para preflight
  server.options('*', cors(corsOptions));



  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  /* Static files */
  server.use(express.static('public'));
  /* Swagger */
  server.get('/docs', (req, res) => res.send(swaggerDoc));
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  /* MDW */
  server.use(morganMiddleware);
  /* Routes */
  server.use(router);
  /* Error handler */
  server.use(errorMiddleware);
}