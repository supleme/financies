<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
export class CreateTransactionDto {
  @ApiProperty({ example: 'Salário de Junho', description: 'Descrição da transação' })
  description: string;

  @ApiProperty({ example: 5000.00, description: 'Valor da transação' })
  amount: number;

  @ApiProperty({ enum: ['income', 'expense'], example: 'income', description: 'Tipo da transação' })
  type: 'income' | 'expense';

  @ApiProperty({ example: '2025-06-30T03:00:00.000Z', description: 'Data da transação' })
  date: Date;
=======
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsIn(['income', 'expense'])
  type: 'income' | 'expense';
>>>>>>> 80eb1ace50e8f84c878ea8484ab5a1f853f94c07
}