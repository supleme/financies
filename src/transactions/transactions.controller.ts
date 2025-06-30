import { Controller, Get, Post, Put, Patch, Delete, Param, Body, HttpCode, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

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
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(201)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Cria uma nova transação (Apenas ADMIN)' })
  @ApiResponse({ status: 201, description: 'A transação foi criada com sucesso.'})
  @ApiResponse({ status: 403, description: 'Acesso negado. Requer papel de ADMIN.'})
  async create(@Body() createItem: CreateTransactionDto): Promise<Transaction> {
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

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma transação específica pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da transação a ser buscada' })
  @ApiResponse({ status: 200, description: 'Dados da transação retornados com sucesso.'})
  @ApiResponse({ status: 404, description: 'Transação não encontrada.'})
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Transaction> {
    return this.transactionsService.findOne(id);
  }


  @Put(':id')
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
    return this.transactionsService.update(id, updateData);
  }

  @Patch(':id')
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
