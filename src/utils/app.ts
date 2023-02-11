import express from 'express';
import HandleError from '../Middlewares/handleError';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(HandleError.handle);

export default app;
