import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {LucideAngularModule, ArrowLeft} from 'lucide-angular';
import {
  LoadingOverlayComponent,
  NotificationComponent,
  NotificationType,
  ProductRequest,
  ProductService
} from '../../../core';
import {FormProductComponent} from '../form-product/form-product.component';

@Component({
  selector: 'app-create-product',
  imports: [
    LucideAngularModule,
    LoadingOverlayComponent,
    NotificationComponent,
    FormProductComponent
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {

  readonly ArrowLeft = ArrowLeft;

  loading = false;

  showNotification = false;
  notificationMessage = '';
  notificationType: NotificationType = 'success';

  _productService: ProductService = inject(ProductService);
  _router: Router = inject(Router);

  async navigateToList() {
    await this._router.navigate(['/products/list']);
  }

  onFormSubmit(productData: ProductRequest) {
    this.loading = true;

    this._productService.createProduct(productData).subscribe({
      next: (response) => {

        if (response.code != 201) {
          this.showErrorNotification(response.message);
          this.loading = false;
          return;
        }

        this.showSuccessNotification('Producto creado correctamente');
        this.loading = false;
      },
      error: () => {
        this.showErrorNotification('Error al crear el producto');
        this.loading = false;
      }
    });
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

  onNotificationClose() {
    this.showNotification = false;
  }
}
