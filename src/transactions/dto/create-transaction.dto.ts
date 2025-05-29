import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsIn(['income', 'expense'])
  type: 'income' | 'expense';
}