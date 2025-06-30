import { ApiProperty } from '@nestjs/swagger';
export class RegisterDto {
  @ApiProperty({ example: 'novo.usuario@email.com', description: 'E-mail para o novo registro' })
  email: string;

  @ApiProperty({ example: 'senhaForte123!', description: 'Senha do novo usuário' })
  password: string;

  @ApiProperty({ required: false, example: 'Nome do Usuário', description: 'Nome opcional do usuário' })
  name?: string;
}