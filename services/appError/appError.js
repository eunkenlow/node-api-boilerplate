const ErrorCode = require('./errorCode');
const utils = require('../utils');

class AppError extends Error {
  constructor(errorCode, error = new Error()) {
    super();
    this.errorCode = errorCode;
    this.error = error;
  }

  static wrap(error) {
    if (error instanceof AppError) return error;
    return new AppError(ErrorCode.General.InternalServerError, error);
  }

  toString() {
    return `Code: ${this.code}, Stack: ${this.error.stack}`;
  }

  toJSON() {
    if (this.status >= 500) utils.error(this.toString());

    return {
      error: {
        code: this.errorCode.code,
        message: this.errorCode.message,
      },
    };
  }

  get status() {
    return this.errorCode.status;
  }

  get code() {
    return this.errorCode.code;
  }
}

module.exports = AppError;
