import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, Package, ShoppingCart, Edit, ClipboardList, Archive, Users } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  readonly Package = Package;
  readonly Archive = Archive;
  readonly Users = Users;
  readonly ShoppingCart = ShoppingCart;
  readonly Edit = Edit;
  readonly ClipboardList = ClipboardList;

  private router: Router = inject(Router);

  async navigateToProducts() {
    await this.router.navigate(['/products']);
  }

  async navigateToBatches() {
    await this.router.navigate(['/batches']);
  }

  navigateToClients() {
    console.log('Navegando a clientes...');
  }

  navigateToShopping() {
    console.log('Navegando a compras...');
  }

  navigateToNotes() {
    console.log('Navegando a notas...');
  }

  navigateToPlan() {
    console.log('Navegando a plan...');
  }
}
