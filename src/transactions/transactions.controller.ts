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

@Controller('transactions')
@UseInterceptors(ResponseInterceptor)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createItem: CreateTransactionDto): Transaction {
    return this.transactionsService.create(createItem);
  }

  @Get()
  findAll(@Query('type') type?: 'income' | 'expense'): Transaction[] {
    return this.transactionsService.findAll(type);
  }

  // ROTAS FIXAS / ESPECÍFICAS VEM PRIMEIRO!

  @Get('summary')
  getSummary() {
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

  // ROTA DINÂMICA VEM POR ÚLTIMO PARA NÃO SOBRESCREVER AS OUTRAS

  @Get(':id')
  findOne(@Param('id') id: string): Transaction {
    return this.transactionsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: UpdateTransactionDto,
  ): Transaction {
    return this.transactionsService.update(id, updateData);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() partialUpdateData: UpdateTransactionDto,
  ): Transaction {
    return this.transactionsService.update(id, partialUpdateData);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
