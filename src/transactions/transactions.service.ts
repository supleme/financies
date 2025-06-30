import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transaction } from '@prisma/client';
@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}
  private items: Transaction[] = []; // Armazena a lista de itens em memória
  private nextId = 1;

  // Método para criar um novo item
  async create(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
    return this.prisma.transaction.create({
      data,
    });
  }


  // Listar todas as transações, com filtro opcional de tipo
  async findAll(type: string): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({});
  } 
  

  async getSummary() {
    const transactions = await this.prisma.transaction.findMany();
    const totalIncome = transactions
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = transactions
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0);

    return {
      totalIncome,
      totalExpense,
    };
  }

  // Método para encontrar um item específico pelo ID
  async findOne(id: number): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    return transaction;
  }

  // Atualizar uma transação
  async update(id: number, updateData: Partial<Transaction>): Promise<Transaction> {
    await this.findOne(id); // lança 404 se não existir
    return this.prisma.transaction.update({
      where: { id },
      data: updateData,
    });
  }


  // Método para remover um item específico pelo ID
  async remove(id: number): Promise<void> {
    await this.findOne(id); // lança 404 se não existir
    await this.prisma.transaction.delete({
      where: { id },
    });
  }
}