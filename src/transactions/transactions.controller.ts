import { Controller, Get, Post, Put, Patch, Delete, Param, Body, HttpCode, Query, ParseIntPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from '@prisma/client';

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

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(201)

  async create(@Body() createItem: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsService.create(createItem);
  } 

  @Get()
  async findAll(@Query('type') type: string): Promise<Transaction[]> {
    return this.transactionsService.findAll(type);
  }

  @Get('summary')
  async getSummary() {
    return this.transactionsService.getSummary();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Transaction> {
    return this.transactionsService.findOne(id);
  }


  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsService.update(id, updateData);
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() partialUpdateData: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsService.update(id, partialUpdateData);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.transactionsService.remove(id);
  }
}
