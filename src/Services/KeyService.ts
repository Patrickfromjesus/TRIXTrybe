import { Model } from 'mongoose';
import Cpf from '../Domain/Keys/Cpf';
import Email from '../Domain/Keys/Email';
import Phone from '../Domain/Keys/Phone';
import IKey from '../interfaces/IKey';
import KeyModel from '../models/KeyModel';

class KeyService {
  private model: Model<IKey>;

  constructor() {
    this.model = KeyModel;
  }

  private createKeyDomain(key: IKey) {
    switch (key.type) {
      case 'cpf':
        return new Cpf(key.owner, key.type, key.value);
      
      case 'email':
        return new Email(key.owner, key.type, key.value);

      default:
        return new Phone(key.owner, key.type, key.value);
    }
  }

  async createKey(key: IKey) {
    const newKey = this.createKeyDomain(key);
    const filter = { owner: newKey.owner, type: newKey.type, value: newKey.value };
    const data = await this.model.create(filter);
    return this.createKeyDomain(data);
  }

  async getKeysByOwner(owner: { owner: string }) {
    const data = await this.model.find(owner);
    if (data.length < 1) throw new Error('Owner Not Found!');
    return data;
  }

}

export default KeyService;
