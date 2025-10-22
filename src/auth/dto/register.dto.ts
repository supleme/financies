import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsIn } from 'class-validator';
export class RegisterDto {
  @ApiProperty({ example: 'novo.usuario@email.com', description: 'E-mail para o novo registro' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaForte123!', description: 'Senha do novo usuário' })
  @IsString()
  password: string;

  @ApiProperty({ required: false, example: 'Nome do Usuário', description: 'Nome opcional do usuário' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({required: false, example: 'USER',  description: 'Papel (Role) do usuário. Deve ser ADMIN ou USER.', enum: ['ADMIN', 'USER']})
  @IsOptional()
  @IsString()
  @IsIn(['ADMIN', 'USER'])
  role?: 'ADMIN' | 'USER';
}