import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, HelpCircle, X } from 'lucide-angular';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Input() show = false;
  @Input() message = '';
  @Input() title = 'Confirmación';
  @Input() acceptText = 'Aceptar';
  @Input() cancelText = 'Cancelar';
  @Input() type: 'danger' | 'warning' | 'info' = 'warning';

  @Output() accept = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  readonly HelpCircle = HelpCircle;
  readonly X = X;

  onAccept(): void {
    this.accept.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }

  getIconClasses(): string {
    switch (this.type) {
      case 'danger':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-yellow-500';
    }
  }

  getAcceptButtonClasses(): string {
    const baseClasses = 'cursor-pointer px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    switch (this.type) {
      case 'danger':
        return `${baseClasses} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500`;
      case 'warning':
        return `${baseClasses} bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500`;
      case 'info':
        return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500`;
      default:
        return `${baseClasses} bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500`;
    }
  }
}
