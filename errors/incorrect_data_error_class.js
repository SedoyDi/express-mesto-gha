const INCORRECT_DATA = require("./error_code");

class IncorrectDataError extends Error {
  constructor(massage) {
    super(massage);
    this.statusCode = INCORRECT_DATA;
  }
}

module.exports = IncorrectDataError;
