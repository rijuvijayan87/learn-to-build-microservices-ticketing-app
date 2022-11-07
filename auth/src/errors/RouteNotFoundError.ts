import { CustomError } from './CustomError';

export class RouteNotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Invalid route');
    Object.setPrototypeOf(this, RouteNotFoundError.prototype);
  }

  serializeError() {
    return [
      {
        message: 'Invalid route attempted',
      },
    ];
  }
}
