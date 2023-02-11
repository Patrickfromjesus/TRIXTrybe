export default class Cpf {
  private _owner: string = '';
  private _type: string = '';
  private _value: string = '';

  constructor(o: string, t: string, v: string) {
    this.owner = o;
    this.type = t;
    this.value = v;
  }

  private validateCpf(cpf: string) {
    const cpfRegex = /^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/;
    if (!cpfRegex.test(cpf)) throw new Error('Invalid Cpf!');
    this._value = cpf;
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