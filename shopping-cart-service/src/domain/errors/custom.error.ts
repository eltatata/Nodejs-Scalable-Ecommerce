export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
  ) {
    super(message);
  }

  static badRequest(message: string): CustomError {
    return new CustomError(400, message);
  }

  static notFound(message: string): CustomError {
    return new CustomError(404, message);
  }

  static unauthorized(message: string): CustomError {
    return new CustomError(401, message);
  }

  static forbidden(message: string): CustomError {
    return new CustomError(403, message);
  }

  static conflict(message: string): CustomError {
    return new CustomError(409, message);
  }

  static internalServer(message: string): CustomError {
    return new CustomError(500, message);
  }
}
