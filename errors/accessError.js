class AccessError extends Error {
  constructor(massage) {
    super(massage);
    this.statusCode = 403;
  }
}

module.exports = AccessError;
