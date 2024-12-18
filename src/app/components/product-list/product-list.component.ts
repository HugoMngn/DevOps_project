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
  selectedProduct: Product | null = null;
  @Output() clickProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<Product>(); 

  onProductClic(event: MouseEvent, product: Product): void {
    if (!(event.target instanceof HTMLButtonElement)) {
      this.clickProduct.emit(product);
      this.selectedProduct = product;
    }
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  toggleDetails(product: Product): void {
    if (this.selectedProduct === product) {
      this.selectedProduct = null;
    } else {
      this.selectedProduct = product;
    }
  }

  onDelete(product: Product): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le produit "${product.nom}" ?`)) {
      this.deleteProduct.emit(product); 
    }
  }
}
