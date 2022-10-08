class ConflictError extends Error {
  constructor(massage) {
    super(massage);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
