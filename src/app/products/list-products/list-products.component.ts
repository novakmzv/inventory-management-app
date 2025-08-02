import {Component, inject, OnInit} from '@angular/core';
import {LucideAngularModule, Plus, Edit, Trash2, Home} from 'lucide-angular';
import {NotificationType, Product, ProductService} from '../../../core';
import {Router} from '@angular/router';
import {LoadingOverlayComponent, ConfirmationModalComponent, NotificationComponent} from '../../../core';

@Component({
  selector: 'app-list-products',
  imports: [
    LucideAngularModule,
    LoadingOverlayComponent,
    ConfirmationModalComponent,
    NotificationComponent
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

  showConfirmModal = false;
  confirmMessage = '';
  confirmType: 'danger' | 'warning' | 'info' = 'warning';
  confirmAction: (() => void) | null = null;

  showNotification = false;
  notificationMessage = '';
  notificationType: NotificationType = 'success';

  _productService: ProductService = inject(ProductService);
  _router: Router = inject(Router);

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {

    this.loading = true;

    this._productService.getProducts().subscribe({
      next: (response) => {

        if (response.code != 200) {
          this.loading = false;
          this.showErrorNotification('Error al cargar los productos');
          return
        }

        this.products = structuredClone(response.data);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showErrorNotification('Error al cargar los productos');
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
    this.loading = true;

    this._productService.deleteProduct(id).subscribe({
      next: (response) => {

        if (response.code != 200) {
          this.loading = false;
          this.showErrorNotification('Error al eliminar el producto');
          return;
        }

        this.showSuccessNotification('Producto eliminado correctamente');
        this.loading = false;
        this.loadProducts();
      },
      error: () => {
        this.loading = false;
        this.showErrorNotification('Error al eliminar el producto');
      }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(price);
  }

  onNotificationClose() {
    this.showNotification = false;
  }

  private showSuccessNotification(message: string) {
    this.notificationMessage = message;
    this.notificationType = 'success';
    this.showNotification = true;
  }

  private showErrorNotification(message: string) {
    this.notificationMessage = message;
    this.notificationType = 'error';
    this.showNotification = true;
  }
}
