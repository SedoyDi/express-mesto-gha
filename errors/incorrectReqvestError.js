class IncorrectReqvestError extends Error {
  constructor(massage) {
    super(massage);
    this.statusCode = 400;
  }
}

module.exports = IncorrectReqvestError;
