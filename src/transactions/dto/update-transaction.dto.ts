<<<<<<< HEAD

import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateTransactionDto {
  @ApiPropertyOptional({ example: 'Bônus de performance', description: 'Nova descrição da transação' })
  description?: string;

  @ApiPropertyOptional({ example: 750.50, description: 'Novo valor da transação' })
  amount?: number;

  @ApiPropertyOptional({ enum: ['income', 'expense'], example: 'income', description: 'Novo tipo da transação' })
  type?: 'income' | 'expense';

  @ApiPropertyOptional({ example: '2025-07-01T03:00:00.000Z', description: 'Nova data da transação' })
  date?: Date;
}
=======
import { IsOptional, IsNumber, IsString, IsIn } from 'class-validator';
export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsIn(['income', 'expense'])
  type?: 'income' | 'expense';
}
>>>>>>> 80eb1ace50e8f84c878ea8484ab5a1f853f94c07
