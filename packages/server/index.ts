import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routers';

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors(
  {
    origin: `${process.env.CLIENT_URL}`,
    credentials: true
  }
));
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api', routes);

import './config/database';

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
