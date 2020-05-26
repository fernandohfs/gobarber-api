import { BAD_REQUEST } from 'http-status';

class Error {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = BAD_REQUEST) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default Error;
