import {Component, inject, OnInit} from '@angular/core';
import {LucideAngularModule, Plus, Edit, Trash2, Home} from 'lucide-angular';
import {Product, ProductService} from '../../../core';
import {Router} from '@angular/router';
import {LoadingOverlayComponent, ConfirmationModalComponent} from '../../../core/components';

@Component({
  selector: 'app-list-products',
  imports: [
    LucideAngularModule,
    LoadingOverlayComponent,
    ConfirmationModalComponent
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

  showConfirmModal = false;
  confirmMessage = '';
  confirmType: 'danger' | 'warning' | 'info' = 'warning';
  confirmAction: (() => void) | null = null;

  _productService: ProductService = inject(ProductService);
  _router: Router = inject(Router);

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {

    this.loading = true;
    this.error = null;

    this._productService.getProducts().subscribe({
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
    await this._router.navigate(['/products/create']);
  }

  async editProduct(id: number) {
    await this._router.navigate(['/products/edit', id]);
  }

  async navigateToHome() {
    await this._router.navigate(['/home']);
  }

  deleteProduct(id: number, name: string) {
    this.confirmMessage = `¿Estás seguro de que quieres eliminar "${name}"?`;
    this.confirmType = 'danger';
    this.confirmAction = () => this.confirmDeleteProduct(id);
    this.showConfirmModal = true;
  }

  onConfirmAccept() {
    if (this.confirmAction) {
      this.confirmAction();
    }
    this.showConfirmModal = false;
  }

  onConfirmCancel() {
    this.showConfirmModal = false;
    this.confirmAction = null;
  }

  private confirmDeleteProduct(id: number) {

  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(price);
  }
}
