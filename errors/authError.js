class AuthError extends Error {
  constructor(massage) {
    super(massage);
    this.statusCode = 401;
  }
}

module.exports = AuthError;
