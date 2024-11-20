import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { CategoryInterface } from '../../interfaces/category-interface';
import { BurgersService } from '../../services/burgers.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CardComponent, ButtonComponent, CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  categories: CategoryInterface[] = []; // Lista completa de categorias
  displayedCategories: CategoryInterface[] = []; // Categorias a serem exibidas inicialmente
  remainingCategories: CategoryInterface[] = []; // Categorias restantes
  burgersService: BurgersService = inject(BurgersService); // Serviço para buscar dados das categorias
  showAll = false; // Controle para exibição de todas as categorias

  // Exibe todas as categorias
  showFullMenu() {
    this.showAll = true;
  }

  // Limita a exibição às 3 primeiras categorias
  showLess() {
    this.showAll = false;
  }

  constructor() {
    // Obtém a lista de categorias e atualiza a exibição
    this.burgersService.getCategories().then((categories) => {
      this.categories = categories;
      // Define as categorias que serão inicialmente exibidas
      this.displayedCategories = this.categories.slice(0, 3);
      // Define as categorias restantes para exibição posterior
      this.remainingCategories = this.categories.slice(3);
    });
  }
}
