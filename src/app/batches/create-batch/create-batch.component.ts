import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LucideAngularModule, ArrowLeft} from 'lucide-angular';
import {BatchService, ProductService, Product, NotificationType, BatchRequest} from '../../../core';
import {LoadingOverlayComponent, NotificationComponent} from '../../../core';
import {BatchFormComponent} from '../batch-form/batch-form.component';

@Component({
  selector: 'app-create-batch',
  imports: [
    LucideAngularModule,
    LoadingOverlayComponent,
    NotificationComponent,
    BatchFormComponent
  ],
  templateUrl: './create-batch.component.html',
  styleUrl: './create-batch.component.css'
})
export class CreateBatchComponent implements OnInit {

  readonly ArrowLeft = ArrowLeft;

  isLoadingPage = false;
  loadingMessage = '';
  availableProducts: Product[] = [];

  showNotification = false;
  notificationMessage = '';
  notificationType: NotificationType = 'success';

  _batchService: BatchService = inject(BatchService);
  _productService: ProductService = inject(ProductService);
  _router: Router = inject(Router);

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {

    this.isLoadingPage = true;
    this.loadingMessage = 'Cargando productos...';

    this._productService.getProducts().subscribe({
      next: (response) => {

        if (response.code != 200) {
          this.showErrorNotification('Error al cargar productos');
          this.isLoadingPage = false;
          return;
        }

        this.availableProducts = structuredClone(response.data);
        this.isLoadingPage = false;
      },
      error: () => {
        this.showErrorNotification('Error al cargar productos');
        this.isLoadingPage = false;
      }
    });
  }

  async navigateToList() {
    await this._router.navigate(['/batches/list']);
  }

  onFormSubmit(batchData: BatchRequest) {

    this.loadingMessage = 'Creando lote...';
    this.isLoadingPage = true;

    this._batchService.createBatch(batchData).subscribe({
      next: (response) => {

        if (response.code != 201) {
          this.showErrorNotification(response.message);
          this.isLoadingPage = false;
          return;
        }

        this.showSuccessNotification('Lote creado correctamente');
        this.isLoadingPage = false;
      },
      error: () => {
        this.showErrorNotification('Error al crear el lote');
        this.isLoadingPage = false;
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
