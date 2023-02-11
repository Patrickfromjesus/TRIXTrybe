import { isValidObjectId, Model } from 'mongoose';
import Pix from '../Domain/Pix';
import statusPix from '../enums/statusPix';
import IPix from '../interfaces/IPix';
import PixModel from '../models/PixModel';

class PixService {
  private model: Model<IPix>;

  constructor() {
    this.model = PixModel;
  }

  private createPaymentDomain(payment: IPix) {
    return new Pix(
      payment.id as string,
      payment.transferBy,
      payment.transferTo,
      payment.amount,
      payment.key,
      payment.status as statusPix,
    );
  }

  private validCpf(cpf: string) {
    const cpfRegex = /^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/;
    if (!cpfRegex.test(cpf)) return { ok: false };
    return { ok: true };
  }

  async getAll() {
    const data = await this.model.find<IPix>();
    const response = data.map((e) => this.createPaymentDomain(e));
    return response;
  }

  async getByKey(key: string) {
    const data = await this.model.find<IPix>({ key });
    const response = data.map((e) => this.createPaymentDomain(e));
    return response;
  }

  async transfer(payment: IPix) {
    if (!(this.validCpf(payment.key).ok)) throw new Error('Invalid key!')
    const data = await this.model.create({ ...payment, status: statusPix.pending });
    return this.createPaymentDomain(data);
  }

  async cancellTransfer(id: string) {
    if (!isValidObjectId(id)) throw new Error('Invalid Id!');
    const data = await this.model.findByIdAndUpdate({ _id: id }, { status: statusPix.cancelled } );
    return data;
  }
}

export default PixService;
