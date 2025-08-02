import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, Plus, Edit, Trash2, Home, Archive, Calendar, Package2 } from 'lucide-angular';
import {Batch, BatchService, DateUtils, NotificationType} from '../../../core';
import { LoadingOverlayComponent, ConfirmationModalComponent, NotificationComponent } from '../../../core';

@Component({
  selector: 'app-list-batches',
  imports: [
    LucideAngularModule,
    LoadingOverlayComponent,
    ConfirmationModalComponent,
    NotificationComponent
  ],
  templateUrl: './list-batches.component.html',
  styleUrl: './list-batches.component.css'
})
export class ListBatchesComponent implements OnInit {

  readonly Home = Home;
  readonly Plus = Plus;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Archive = Archive;
  readonly Calendar = Calendar;
  readonly Package2 = Package2;

  batches: Batch[] = [];
  loading = false;
  error: string | null = null;

  // Propiedades para modal de confirmación
  showConfirmModal = false;
  confirmMessage = '';
  confirmType: 'danger' | 'warning' | 'info' = 'warning';
  confirmAction: (() => void) | null = null;

  // Propiedades para notificaciones
  showNotification = false;
  notificationMessage = '';
  notificationType: NotificationType = 'success';

  _batchService: BatchService = inject(BatchService);
  _router: Router = inject(Router);

  ngOnInit() {
    this.loadBatches();
  }

  private loadBatches() {
    this.loading = true;
    this.error = null;

    this._batchService.getBatches().subscribe({
      next: (response) => {

        if (response.code != 200) {
          this.error = response.message;
          this.loading = false;
          return;
        }

        this.batches = structuredClone(response.data);
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los lotes';
        this.loading = false;
      }
    });
  }

  async navigateToHome() {
    await this._router.navigate(['/home']);
  }

  async navigateToCreate() {
    await this._router.navigate(['/batches/create']);
  }

  async editBatch(id: number) {
    await this._router.navigate(['/batches/edit', id]);
  }

  deleteBatch(id: number, date: string) {
    this.confirmMessage = `¿Estás seguro de que quieres eliminar el lote del ${this.formatDate(date)}?`;
    this.confirmType = 'danger';
    this.confirmAction = () => this.confirmDeleteBatch(id);
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

  private confirmDeleteBatch(id: number) {
    this.loading = true;

    this._batchService.deleteBatch(id).subscribe({
      next: (response) => {

        if (response.code != 200) {
          this.showErrorNotification(response.message);
          this.loading = false;
          return;
        }

        this.showSuccessNotification('Lote eliminado correctamente');
        this.loadBatches();

      },
      error: () => {
        this.showErrorNotification('Error al eliminar el lote');
        this.loading = false;
      }
    });
  }

  formatDate(date: string): string {
    return DateUtils.formatToDisplayDate(date);
  }

  isRecentBatch(date: string): boolean {
    return DateUtils.isWithinDays(date, 7);
  }

  isTodayBatch(date: string): boolean {
    return DateUtils.isToday(date);
  }

  getTotalProducts(batch: Batch): number {
    if (!batch.products) return 0;
    return batch.products.reduce((total, product) => total + product.quantity, 0);
  }

  getBatchStatusClasses(date: string): string {
    if (this.isTodayBatch(date)) {
      return 'bg-green-100 text-green-800';
    }
    if (this.isRecentBatch(date)) {
      return 'bg-blue-100 text-blue-800';
    }
    return 'bg-gray-100 text-gray-800';
  }

  getBatchStatusText(date: string): string {
    if (this.isTodayBatch(date)) {
      return 'Hoy';
    }
    if (this.isRecentBatch(date)) {
      return 'Reciente';
    }
    return 'Anterior';
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
