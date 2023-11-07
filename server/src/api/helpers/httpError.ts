class HttpError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}

export default HttpError
