import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { LucideAngularModule, CheckCircle, XCircle, AlertTriangle, X } from 'lucide-angular';

export type NotificationType = 'success' | 'error' | 'warning';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnChanges, OnDestroy {

  @Input() message = '';
  @Input() type: NotificationType = 'success';
  @Input() show = false;
  @Input() duration = 3000;

  @Output() close = new EventEmitter<void>();

  readonly CheckCircle = CheckCircle;
  readonly XCircle = XCircle;
  readonly AlertTriangle = AlertTriangle;
  readonly X = X;

  private timeoutId: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'] && this.show) {
      this.startAutoClose();
    }
  }

  ngOnDestroy() {
    this.clearTimeout();
  }

  private startAutoClose() {
    this.clearTimeout();
    if (this.duration > 0) {
      this.timeoutId = setTimeout(() => {
        this.closeNotification();
      }, this.duration);
    }
  }

  closeNotification() {
    this.clearTimeout();
    this.close.emit();
  }

  private clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  getNotificationClasses(): string {
    const baseClasses = 'fixed top-4 right-4 left-4 sm:left-auto sm:right-4 sm:max-w-md w-full sm:w-auto min-w-0 sm:min-w-[300px] p-4 rounded-lg shadow-lg border-l-4 z-50 transform transition-all duration-300 ease-out';

    switch (this.type) {
      case 'success':
        return `${baseClasses} bg-green-50 border-l-green-500 text-green-800`;
      case 'error':
        return `${baseClasses} bg-red-50 border-l-red-500 text-red-800`;
      case 'warning':
        return `${baseClasses} bg-yellow-50 border-l-yellow-500 text-yellow-800`;
      default:
        return `${baseClasses} bg-green-50 border-l-green-500 text-green-800`;
    }
  }

  getIconClasses(): string {
    switch (this.type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  }

  getCloseButtonClasses(): string {
    switch (this.type) {
      case 'success':
        return 'text-green-500 hover:text-green-700 hover:bg-green-100';
      case 'error':
        return 'text-red-500 hover:text-red-700 hover:bg-red-100';
      case 'warning':
        return 'text-yellow-500 hover:text-yellow-700 hover:bg-yellow-100';
      default:
        return 'text-green-500 hover:text-green-700 hover:bg-green-100';
    }
  }
}
