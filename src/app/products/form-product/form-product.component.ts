import { Component, inject, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, Save } from 'lucide-angular';
import { Product } from '../../../core';

@Component({
  selector: 'app-form-product',
  imports: [
    ReactiveFormsModule,
    LucideAngularModule
  ],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.css'
})
export class FormProductComponent implements OnInit, OnChanges {

  @Input() product: Product | null = null;
  @Input() loading = false;
  @Input() submitButtonText = 'Guardar producto';

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  readonly Save = Save;

  productForm: FormGroup;

  _formBuilder: FormBuilder = inject(FormBuilder);

  constructor() {
    this.productForm = this.createForm();
  }

  ngOnInit() {
    if (this.product) {
      this.loadProductData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.loadProductData();
    }
  }

  private createForm(): FormGroup {
    return this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.maxLength(500)]]
    });
  }

  private loadProductData() {
    if (!this.product) return;

    this.productForm.patchValue({
      name: this.product.name,
      quantity: this.product.quantity,
      price: this.product.price,
      description: this.product.description || ''
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.formSubmit.emit(this.productForm.value);
    this.productForm.reset();
  }

  onCancel() {
    this.formCancel.emit();
  }

  private markFormGroupTouched() {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    if (field.errors['required']) return `${this.getFieldLabel(fieldName)} es requerido`;
    if (field.errors['minlength']) return `${this.getFieldLabel(fieldName)} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['maxlength']) return `${this.getFieldLabel(fieldName)} no puede exceder ${field.errors['maxlength'].requiredLength} caracteres`;
    if (field.errors['min']) return `${this.getFieldLabel(fieldName)} debe ser mayor a ${field.errors['min'].min}`;

    return 'Campo inválido';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      name: 'El nombre',
      quantity: 'La cantidad',
      price: 'El precio',
      description: 'La descripción'
    };
    return labels[fieldName] || 'El campo';
  }
}
