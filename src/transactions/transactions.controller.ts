<<<<<<< HEAD
import { Controller, Get, Post, Put, Patch, Delete, Param, Body, HttpCode, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
=======
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  Query,
  UseInterceptors,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

import { ResponseInterceptor } from 'src/response/response.interceptor';
import { CustomException } from 'src/custom-exception/custom-exception';
>>>>>>> 80eb1ace50e8f84c878ea8484ab5a1f853f94c07

// DTO para criação (simplificado)
class CreateTransactionDto {
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
}

// DTO para atualização parcial
class UpdateTransactionDto {
  description?: string;
  amount?: number;
  type?: 'income' | 'expense';
  date?: Date;
}

@ApiTags('Transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transactions')
@UseInterceptors(ResponseInterceptor)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(201)
<<<<<<< HEAD
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Cria uma nova transação (Apenas ADMIN)' })
  @ApiResponse({ status: 201, description: 'A transação foi criada com sucesso.'})
  @ApiResponse({ status: 403, description: 'Acesso negado. Requer papel de ADMIN.'})
  async create(@Body() createItem: CreateTransactionDto): Promise<Transaction> {
=======
  create(@Body() createItem: CreateTransactionDto): Transaction {
>>>>>>> 80eb1ace50e8f84c878ea8484ab5a1f853f94c07
    return this.transactionsService.create(createItem);
  } 

  @Get()
  @ApiOperation({ summary: 'Lista todas as transações, com filtro opcional por tipo' })
  @ApiQuery({ name: 'type', required: false, description: 'Filtra transações por tipo (income ou expense)'})
  @ApiResponse({ status: 200, description: 'Lista de transações retornada com sucesso.'})
  async findAll(@Query('type') type: string): Promise<Transaction[]> {
    return this.transactionsService.findAll(type);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Retorna um resumo de receitas, despesas e saldo total' })
  @ApiResponse({ status: 200, description: 'Resumo retornado com sucesso.'})
  async getSummary() {
    return this.transactionsService.getSummary();
  }

  @Get('not-found/:id')
  simulateNotFound(@Param('id') id: string) {
    if (id !== '1') {
      throw new NotFoundException('Transação não encontrada');
    }
    return { id, status: 'Transação encontrada' };
  }

  @Get('bad-request')
  simulateBadRequest() {
    throw new BadRequestException('Requisição inválida');
  }

  @Get('forbidden')
  simulateForbidden() {
    throw new ForbiddenException('Acesso não permitido');
  }

  @Get('http-exception')
  simulateHttpException() {
    throw new HttpException(
      'Erro genérico com HttpException',
      HttpStatus.I_AM_A_TEAPOT,
    );
  }

  @Get('custom-error')
  simulateCustomException() {
    throw new CustomException(
      'Erro lançado por uma exceção customizada',
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma transação específica pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da transação a ser buscada' })
  @ApiResponse({ status: 200, description: 'Dados da transação retornados com sucesso.'})
  @ApiResponse({ status: 404, description: 'Transação não encontrada.'})
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Transaction> {
    return this.transactionsService.findOne(id);
  }

  @Put(':id')
<<<<<<< HEAD
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Atualiza todos os dados de uma transação (Apenas ADMIN)' })
  @ApiParam({ name: 'id', description: 'ID da transação a ser atualizada' })
  @ApiResponse({ status: 200, description: 'Transação atualizada com sucesso.'})
  @ApiResponse({ status: 403, description: 'Acesso negado. Requer papel de ADMIN.'})
  @ApiResponse({ status: 404, description: 'Transação não encontrada.'})
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateTransactionDto,
  ): Promise<Transaction> {
=======
  update(
    @Param('id') id: string,
    @Body() updateData: UpdateTransactionDto,
  ): Transaction {
>>>>>>> 80eb1ace50e8f84c878ea8484ab5a1f853f94c07
    return this.transactionsService.update(id, updateData);
  }

  @Patch(':id')
<<<<<<< HEAD
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Atualiza parcialmente uma transação (Apenas ADMIN)' })
  @ApiParam({ name: 'id', description: 'ID da transação a ser atualizada' })
  @ApiResponse({ status: 200, description: 'Transação atualizada com sucesso.'})
  @ApiResponse({ status: 403, description: 'Acesso negado. Requer papel de ADMIN.'})
  @ApiResponse({ status: 404, description: 'Transação não encontrada.'})
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() partialUpdateData: UpdateTransactionDto,
  ): Promise<Transaction> {
=======
  partialUpdate(
    @Param('id') id: string,
    @Body() partialUpdateData: UpdateTransactionDto,
  ): Transaction {
>>>>>>> 80eb1ace50e8f84c878ea8484ab5a1f853f94c07
    return this.transactionsService.update(id, partialUpdateData);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard, RolesGuard) // Guardas que você já tinha
  @ApiBearerAuth() // Indica que esta rota precisa de um token Bearer [cite: 273]
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Deleta uma transação (Apenas ADMIN)' })
  @ApiResponse({ status: 204, description: 'Transação deletada com sucesso.' })
  @ApiResponse({ status: 403, description: 'Acesso negado (Forbidden). Requer papel de ADMIN.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.transactionsService.remove(id);
  }
}
