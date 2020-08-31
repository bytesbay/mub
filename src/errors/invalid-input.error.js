class InvalidInputError extends Error {
  constructor(errors, code = 400) {
    super();
    this.name = this.constructor.name;
    this.errors = errors;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { InvalidInputError }
