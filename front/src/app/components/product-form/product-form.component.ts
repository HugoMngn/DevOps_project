import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { Product } from '../../Model/product';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  @Input() selectedProduct: Product | undefined;
  @Output() saveProduct = new EventEmitter<Product>();
  @Output() cancelEdit = new EventEmitter<void>();

  productForm: FormGroup;
  isNewProduct: boolean = false;

  constructor() {
    this.productForm = new FormGroup({
      id: new FormControl(),
      nom: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern(/^Papier\s.*$/)]),
      texture: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      grammage: new FormControl('', [Validators.required, Validators.pattern(/^\d+\s?gr$/)]),
      couleur: new FormControl('', Validators.required),
    });
  }


  public onNew() {
    this.selectedProduct = undefined;
    this.isNewProduct = true;
    this.productForm.reset();
  }

  public onCancel() {
    this.cancelEdit.emit();
    this.isNewProduct = false;
    this.productForm.reset();
  }


  public onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: Product = this.productForm.value;
      this.saveProduct.emit(updatedProduct);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProduct']) {
      if (this.selectedProduct) {
        this.isNewProduct = false;
        this.productForm.setValue(
          this.selectedProduct
        );
      } else {
        this.productForm.reset();
      }
    }
  }

  public showFieldError(fieldName: string, errorKind: string = ''): boolean {
    const control = this.productForm.get(fieldName);
    if (control?.touched) {
      return errorKind ? control.errors?.[errorKind] : !control.valid;
    }
    return false;
  }
}
