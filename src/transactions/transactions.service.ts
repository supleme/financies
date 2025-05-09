import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from './transaction.model';
@Injectable()
export class TransactionsService {
  private items: Transaction[] = []; // Armazena a lista de itens em memória
  private nextId = 1;

  // Método para criar um novo item
  create(item: Omit<Transaction, 'id'>): Transaction {
    const newItem = {
      id: this.nextId.toString(),
       ...item
    };
    this.items.push(newItem);
    this.nextId++;
    return newItem;
  }

  // Método para listar todos os itens
  findAll(type?: 'income' | 'expense'): Transaction[] {
    if (type) {
      return this.items.filter((item) => item.type === type);
    }
    return this.items;
  }

  getSummary() {
    const totalIncome = this.items
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = this.items
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0);

    return {
      totalIncome,
      totalExpense,
    };
  }

  // Método para encontrar um item específico pelo ID
  findOne(id: string): Transaction {
    const item = this.items.find((item) => item.id === id);
    if (!item) throw new NotFoundException('Transaction not found');
    return item;
  }

  // Método para atualizar um item específico pelo ID
  update(id: string, updateData: Partial<Transaction>): Transaction {
    const item = this.findOne(id);
    Object.assign(item, updateData);
    return item;
  }


  // Método para remover um item específico pelo ID
  remove(id: string) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('Transaction not found');
    this.items.splice(index, 1);
  }
}