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