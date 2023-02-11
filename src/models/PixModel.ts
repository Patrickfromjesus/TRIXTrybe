import mongoose from 'mongoose';
import IPix from '../interfaces/IPix';

class PixM {
  private _schema: mongoose.Schema;
  private _model: mongoose.Model<IPix>;

  constructor() {
    this._schema = new mongoose.Schema<IPix>({
      transferBy: { type: String, required: true },
      transferTo: { type: String, required: true },
      amount: { type: Number, required: true },
      key: { type: String, required: true },
      status: Number,
    }, { versionKey: false });

    this._model = mongoose.models.User || mongoose.model('Pix', this._schema);
  }

  get model() { return this._model };
}

const PixModel = new PixM().model;

export default PixModel;
