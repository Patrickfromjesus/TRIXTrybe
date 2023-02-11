export default class Phone {
  private _owner: string = '';
  private _type: string = '';
  private _value: string = '';

  constructor(o: string, t: string, v: string) {
    this.value = v;
    this.owner = o;
    this.type = t;
  }

  private validatePhone(phone: string) {
    const phoneRegex = /^\+\d{2} \(\d{2}\) \d{9}$/;
    if (!phoneRegex.test(phone)) throw new Error('Invalid Phone!');
    this._value = phone;
  }

  get value() { return this._value };
  get owner() { return this._owner };
  get type() { return this._type };

  set value(v: string) {
    this.validatePhone(v);
  };
  set owner(o: string) { this._owner = o };
  set type(t: string) { this._type = t };
}