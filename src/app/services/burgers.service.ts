import { Injectable } from '@angular/core';
import { CategoryInterface } from '../interfaces/category-interface';
import { BurgerInterface } from '../interfaces/burger-interface';
import { OrderInterface } from '../interfaces/order-interface';

@Injectable({
  providedIn: 'root', // Define que o serviço será fornecido no nível raiz da aplicação
})
export class BurgersService {
  url = 'http://localhost:3000'; // URL base do JSON Server

  constructor() {}

  // Obtém a lista completa de categorias de hambúrgueres
  async getCategories(): Promise<CategoryInterface[]> {
    const data = await fetch(`${this.url}/categories`);
    return data.json();
  }

  // Obtém os detalhes de uma categoria específica pelo ID
  async getCategory(id: number): Promise<CategoryInterface> {
    const response = await fetch(`${this.url}/categories?id=${id}`);
    const data: CategoryInterface[] = await response.json();
    return data[0];
  }

  // Obtém a lista de hambúrgueres pertencentes a uma categoria específica pelo ID da categoria
  async getBurgers(id: number): Promise<BurgerInterface[]> {
    const data = await fetch(`${this.url}/burgers?categoryId=${id}`);
    return data.json();
  }

  // Obtém os detalhes de um hambúrguer específico pelo ID
  async getBurger(id: number): Promise<BurgerInterface> {
    const response = await fetch(`${this.url}/burgers?id=${id}`);
    const data: BurgerInterface[] = await response.json();
    return data[0];
  }

  // Cria um novo pedido enviando os dados para o servidor
  async createOrder(order: OrderInterface): Promise<void> {
    await fetch(`${this.url}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
  }
}
