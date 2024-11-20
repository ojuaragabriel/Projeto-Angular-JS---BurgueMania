import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { BurgersService } from '../../services/burgers.service';
import { CommonModule } from '@angular/common';
import { BurgerInterface } from '../../interfaces/burger-interface';
import { CategoryInterface } from '../../interfaces/category-interface';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CardComponent, ButtonComponent, CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  burgers: BurgerInterface[] = []; // Lista completa de hambúrgueres
  displayedBurgers: BurgerInterface[] = []; // Hambúrgueres exibidos inicialmente
  remainingBurgers: BurgerInterface[] = []; // Hambúrgueres restantes
  category: CategoryInterface | undefined; // Detalhes da categoria
  route: ActivatedRoute = inject(ActivatedRoute); // Injetar rota ativa para capturar parâmetros
  burgersService: BurgersService = inject(BurgersService); // Serviço para buscar dados dos hambúrgueres e categorias
  showAll = false; // Controle para exibição de todos os hambúrgueres

  // Exibe todos os hambúrgueres da categoria
  showFullMenu() {
    this.showAll = true;
  }

  // Limita a exibição aos 3 primeiros hambúrgueres
  showLess() {
    this.showAll = false;
  }

  constructor() {
    // Obtém o ID da categoria a partir dos parâmetros da URL
    const id = Number(this.route.snapshot.params['id']);

    // Busca os hambúrgueres da categoria pelo ID
    this.burgersService.getBurgers(id).then((burgers) => {
      this.burgers = burgers;
      // Define os hambúrgueres a serem exibidos inicialmente
      this.displayedBurgers = this.burgers.slice(0, 3);
      // Define os hambúrgueres restantes para exibição posterior
      this.remainingBurgers = this.burgers.slice(3);
    });

    // Busca os detalhes da categoria pelo ID
    this.burgersService.getCategory(id).then((category) => {
      this.category = category;
    });
  }
}
