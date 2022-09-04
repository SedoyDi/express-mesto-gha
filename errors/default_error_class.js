const DEFAULT_ERR = require("./error_code");

class DefaultError extends Error {
  constructor(massage) {
    super(massage);
    this.statusCode = DEFAULT_ERR;
  }
}

module.exports = DefaultError;
