export class Result<Value, Error = any> {
  static value<Value, Error = any>(v: Value) {
    return new Result<Value, Error>(v, undefined);
  }
  static error<Value, Error = any>(e: Error) {
    return new Result<Value, Error>(undefined, e);
  }

  constructor(
    private _value?: Value,
    private _error?: Error,
  ) {}

  isError() { return this._error !== undefined; }
  isOK() { return !this.isError(); }

  get value() { return this._value!; }
  get error() { return this._error!; }
}
