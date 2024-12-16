import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../Model/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  selectedProduct: any = null;
  @Output() clickProduct = new EventEmitter<Product>();

  onProductClic(event: MouseEvent, product: Product): void {
    if (!(event.target instanceof HTMLButtonElement)) {
      this.clickProduct.emit(product);
      this.selectedProduct = product;
    }
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  viewDetails(product: Product): void {
    this.selectedProduct = product;
  }
}
