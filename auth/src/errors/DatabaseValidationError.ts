import { CustomError } from './CustomError';

export class DatabaseError extends CustomError {
  statusCode = 500;
  reason = 'Database connection failed';
  constructor() {
    super('Database connection failed');
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
  serializeError() {
    return [
      {
        message: this.reason,
      },
    ];
  }

  testFunction = (): string => {
    console.log('testing feature');
    return '';
  };
}
