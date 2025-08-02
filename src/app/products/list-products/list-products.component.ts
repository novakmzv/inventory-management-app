import {Component, inject, OnInit} from '@angular/core';
import {LucideAngularModule, Plus, Edit, Trash2,Home} from 'lucide-angular';
import {Product, ProductService} from '../../../core';
import {Router} from '@angular/router';
import {LoadingOverlayComponent} from '../../../core/components/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-list-products',
  imports: [
    LucideAngularModule,
    LoadingOverlayComponent
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  readonly Home = Home;
  readonly Plus = Plus;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;

  products: Product[] = [];
  loading = false;
  error: string | null = null;

  productService: ProductService = inject(ProductService);
  router: Router = inject(Router);

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {

    this.loading = true;
    this.error = null;

    this.productService.getProducts().subscribe({
      next: (response) => {

        if (response.code != 200) {
          this.error = response.message;
          this.loading = false;
          return
        }

        this.products = structuredClone(response.data);
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los productos';
        this.loading = false;
      }
    });
  }

  async navigateToCreate() {
    await this.router.navigate(['/products/create']);
  }

  async editProduct(id: number) {
    await this.router.navigate(['/products/edit', id]);
  }

  async navigateToHome() {
    await this.router.navigate(['/home']);
  }

  deleteProduct(id: number, name: string) {
    //todo: create confirm component
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(price);
  }
}
