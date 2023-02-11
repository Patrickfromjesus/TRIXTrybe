export default class Email {
  private _owner: string = '';
  private _type: string = '';
  private _value: string = '';

  constructor(o: string, t: string, v: string) {
    this.value = v;
    this.owner = o;
    this.type = t;
  }

  private validateCpf(email: string) {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(email)) throw new Error('Invalid Email!');
    this._value = email;
  }

  get value() { return this._value };
  get owner() { return this._owner };
  get type() { return this._type };

  set value(v: string) {
    this.validateCpf(v);
  };
  set owner(o: string) { this._owner = o };
  set type(t: string) { this._type = t };
}