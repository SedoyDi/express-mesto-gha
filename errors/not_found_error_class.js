const NOT_FOUND = require("./error_code");

class NotFoundErr extends Error {
  constructor(massage) {
    super(massage);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundErr;
