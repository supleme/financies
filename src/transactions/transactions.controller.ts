import { Controller, Get, Post, Put, Patch, Delete, Param, Body, HttpCode, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.model';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(201)

  create(@Body() createItem: any): Transaction { // Parâmetro recebido diretamente sem DTO
    return this.transactionsService.create(createItem);
  }

  @Get()
  findAll(@Query('type') type?: 'income' | 'expense'): Transaction[] {
    return this.transactionsService.findAll(type);
  }

  @Get('summary')
  getSummary() {
    return this.transactionsService.getSummary();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Transaction {
    return this.transactionsService.findOne(id);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any): Transaction {
    return this.transactionsService.update(id, updateData);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() partialUpdateData: any): Transaction {
    return this.transactionsService.update(id, partialUpdateData);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
