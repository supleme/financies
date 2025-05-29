import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string = 'Este é um erro personalizado') {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
        error: 'CustomException',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
