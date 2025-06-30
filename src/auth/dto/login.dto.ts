import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'O e-mail de login do usuário',
    example: 'usuario@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'A senha do usuário (mínimo 6 caracteres)',
    example: 'senha123',
  })
  password: string;
}