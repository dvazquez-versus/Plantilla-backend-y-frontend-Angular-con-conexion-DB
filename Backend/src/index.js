// index.js (raíz), modificado
import express from 'express';
import expressLoader from './loaders/express-loader.js';

const app = express();
expressLoader(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server escuchando en puerto ${PORT}`);
});
