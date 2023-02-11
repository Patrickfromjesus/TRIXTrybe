import express from 'express';
import KeyController from '../Controllers/KeyController';
import PixController from '../Controllers/PixController';

const routes = express.Router();

routes.post('/', async (req, res, next) => {
  new PixController(req, res, next).transfer();
});

routes.patch('/:id', async (req, res, next) => {
  new PixController(req, res, next).cancellTransfer();
});

routes.get('/', async (req, res, next) => {
  new PixController(req, res, next).getAll();
});

routes.post('/key', async (req, res, next) => {
  new PixController(req, res, next).getByKey();
});

routes.post('/keys', async (req, res, next) => {
  new KeyController(req, res, next).createKey();
});

routes.post('/abc', async (req, res, next) => {
  new KeyController(req, res, next).getKeysByOwner();
});

export default routes;
