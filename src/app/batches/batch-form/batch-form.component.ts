import {Component, inject, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import {LucideAngularModule, Save, Plus, Trash2, Package} from 'lucide-angular';
import {Product, BatchRequest} from '../../../core';

@Component({
  selector: 'app-batch-form',
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './batch-form.component.html',
  styleUrl: './batch-form.component.css'
})
export class BatchFormComponent implements OnInit {
  @Input() productList: Product[] = [];
  @Input() submitButton = 'Guardar lote';
  @Output() formSubmit = new EventEmitter<BatchRequest>();
  @Output() formCancel = new EventEmitter<void>();

  readonly Save = Save;
  readonly Plus = Plus;
  readonly Trash2 = Trash2;
  readonly Package = Package;

  batchForm!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.batchForm = this.fb.group({
      production_date: [this.getTodayDate(), [Validators.required]],
      description: [''],
      products: this.fb.array([])
    });
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  get productsArray(): FormArray {
    return this.batchForm.get('products') as FormArray;
  }

  get hasProducts(): boolean {
    return this.productsArray.length > 0;
  }

  get hasAvailableProducts(): boolean {
    return this.productList.length > 0;
  }

  addProduct() {
    const productGroup = this.fb.group({
      product_id: [null, [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });

    this.productsArray.push(productGroup);
  }

  removeProduct(index: number) {
    this.productsArray.removeAt(index);
  }

  getAvailableProducts(currentIndex: number): Product[] {
    const selectedIds = this.getSelectedProductIds();
    const currentSelectedId = this.productsArray.at(currentIndex).get('product_id')?.value;

    return this.productList.filter(product =>
      !selectedIds.includes(product.id) || product.id === currentSelectedId
    );
  }

  private getSelectedProductIds(): number[] {
    return this.productsArray.controls
      .map(control => control.get('product_id')?.value)
      .filter(id => id != null);
  }

  getSelectedProduct(productId: number): Product | undefined {
    return this.productList.find(p => p.id === productId);
  }

  getTotalQuantity(): number {
    return this.productsArray.controls.reduce((total, control) => {
      const quantity = control.get('quantity')?.value || 0;
      return total + Number(quantity);
    }, 0);
  }

  onSubmit() {
    if (this.batchForm.invalid) {
      this.batchForm.markAllAsTouched();
      return;
    }

    if (this.productsArray.length === 0) {
      return;
    }

    const formValue = this.batchForm.value;
    const batchRequest: BatchRequest = {
      production_date: formValue.production_date,
      description: formValue.description || undefined,
      products: formValue.products.map((p: any) => ({
        product_id: Number(p.product_id),
        quantity: Number(p.quantity)
      }))
    };

    this.formSubmit.emit(batchRequest);
    this.batchForm.reset();
  }

  onCancel() {
    this.formCancel.emit();
  }

  // Métodos de validación simplificados
  isFieldInvalid(fieldName: string): boolean {
    const field = this.batchForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  isProductFieldInvalid(index: number, fieldName: string): boolean {
    const field = this.productsArray.at(index)?.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.batchForm.get(fieldName);
    if (!field?.errors || !field?.touched) return '';

    if (field.errors['required']) return 'Este campo es requerido';
    return 'Campo inválido';
  }

  getProductFieldError(index: number, fieldName: string): string {
    const field = this.productsArray.at(index)?.get(fieldName);
    if (!field?.errors || !field?.touched) return '';

    if (field.errors['required']) return 'Este campo es requerido';
    if (field.errors['min']) return 'La cantidad debe ser mayor a 0';
    return 'Campo inválido';
  }
}
