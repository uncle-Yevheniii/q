export class CustomError extends Error {
  public readonly httpCode: number;

  constructor(message: string, httpCode: number) {
    super(message);
    this.httpCode = httpCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
