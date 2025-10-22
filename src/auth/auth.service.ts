import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Método de registro de novo usuário
  async register(registerData: RegisterDto) {
    const { email, password, name, role } = registerData;

    // Verifica se o email ja esta em uso
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email já está em uso.');
    }

    // Gera hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = role || 'USER';

    // Cria novo usuário no banco (usando o model User do Prisma)
    const user = await this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        role: userRole,
      }
    });

    // Remova o campo senha do objeto retornado, por segurança
    const { password: removedPassword, ...result } = user;
    return result;
  }

  // Método de login: valida credenciais e retorna JWT
  async login(email: string, password: string) {
    // Busca o usuário pelo email
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // Compara a senha informada com o hash salvo
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // Credenciais ok, gerar JWT (payload pode incluir informações úteis do usuário)
    const payload = { 
      sub: user.id,
      email: user.email,
      role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}