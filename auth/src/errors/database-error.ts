import { CustomError } from './custom-error';

export class DatabaseError extends CustomError {
  statusCode = 500;
  reason = 'Database connection failed';
  constructor() {
    super('Database connection failed');
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
