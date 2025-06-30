import { HttpExceptionFilter } from './custom-exception.filter';

describe('CustomExceptionFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
});
