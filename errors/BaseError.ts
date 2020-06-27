export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
