import { NextFunction, Request, Response } from 'express';
import IPix from '../interfaces/IPix';
import PixService from '../Services/PixService';

class PixController {
  private service: PixService;

  constructor(private req: Request, private res: Response, private next: NextFunction) {
    this.service = new PixService();
  }

  async getAll() {
    try {
      const data = await this.service.getAll();
      return this.res.status(200).json(data);
    } catch (error) {
      this.next(error);
    }
  }

  async getByKey() {
    try {
      const { key } = this.req.body;
      const data = await this.service.getByKey(key);
      return this.res.status(200).json(data);
    } catch (error) {
      this.next(error);
    }
  }

  async transfer() {
    const { transferBy, transferTo, amount, key } = this.req.body;
    const infos: IPix = { transferBy, transferTo, amount, key };
    try {
      const data = await this.service.transfer(infos);
      return this.res.status(201).json(data);
    } catch (error) {
      this.next(error);
    }
  }

  async cancellTransfer() {
    try {
      const { id } = this.req.params;
      const data = await this.service.cancellTransfer(id);
      return this.res.status(200).json(data);
    } catch (error) {
      this.next((error as Error).message);
    }
  }
}

export default PixController;


