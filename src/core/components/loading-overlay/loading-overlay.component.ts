import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.css'
})
export class LoadingOverlayComponent {
  @Input() isBlock = false;
  @Input() message = 'Cargando...';
}
