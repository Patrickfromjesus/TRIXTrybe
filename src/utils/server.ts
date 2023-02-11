import app from './app';
import connection from '../models/connect';
import 'dotenv/config';

const PORT = Number(process.env.PORT);


connection().then(() => {
    app.listen(PORT, () => console.log(`Open at ${PORT}`))
  })
  .catch((err: Error) => {
    console.log((err as Error).message);
    process.exit(0);
  })
  