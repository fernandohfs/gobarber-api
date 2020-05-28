import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import './database';
import uploadConfig from './config/upload';
import handleErrors from './middlewares/handleErrors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(handleErrors);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
