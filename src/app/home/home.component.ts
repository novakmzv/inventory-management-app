import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {Package, ShoppingCart, Edit, ClipboardList, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  readonly Package = Package;
  readonly ShoppingCart = ShoppingCart;
  readonly Edit = Edit;
  readonly ClipboardList = ClipboardList;

  private router: Router = inject(Router)

  async navigateToProducts() {
    await this.router.navigate(['/products']);
  }
}
