import { NextFunction, Request, Response } from 'express';
import KeyService from '../Services/KeyService';

class KeyController {
  service: KeyService;
  req: Request;
  res: Response;
  next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.service = new KeyService();
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async createKey() {
    const { owner, type, value } = this.req.body;
    try {
      const data = await this.service.createKey({ owner, type, value });
      return this.res.status(201).json(data);
    } catch (error) {
      this.next(error);
    }
  }

  async getKeysByOwner() {
    const owner = this.req.body;
    try {
      const data = await this.service.getKeysByOwner(owner);
      return this.res.status(200).json(data);
    } catch (error) {
      this.next(error);
    }
  }
}

export default KeyController;
