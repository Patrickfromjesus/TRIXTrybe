import mongoose, { model, Model, Schema } from 'mongoose';
import IKey from '../interfaces/IKey';

class KeyM {
  private _schema: mongoose.Schema;
  private _model: mongoose.Model<IKey>;

  constructor() {
    this._schema = new Schema<IKey>({
      owner: { type: String, required: true },
      value: { type: String, required: true, unique: true },
      type: { type: String, required: true },
    }, { versionKey: false });
    this._model = mongoose.models.Key || model('Key', this._schema);
  }

  get model() { return this._model };
}

const KeyModel = new KeyM().model;

export default KeyModel;