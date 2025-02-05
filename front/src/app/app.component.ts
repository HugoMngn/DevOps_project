import { Component } from '@angular/core';
import { Product } from './Model/product';
import { ProductService } from './service/product.service';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, TitleComponent, ProductListComponent, ProductFormComponent]
})
export class AppComponent {
  public products: Product[] = [];
  public selectedProduct: Product | undefined;

  private _refreshTrigger = new BehaviorSubject<void>(undefined);

  constructor(private productService: ProductService) {
    // Charger les produits initialement et à chaque refresh
    this._refreshTrigger
      .pipe(switchMap(() => this.productService.get()))
      .subscribe((products) => (this.products = products));
  }

  // Déclencher un rafraîchissement
  onRefreshList(): void {
    this._refreshTrigger.next();
  }

  // Sélectionner un produit pour modification
  onSelectProduct(product: Product): void {
    this.selectedProduct = product;
  }

  // Annuler la sélection
  onCancelEdit(): void {
    this.selectedProduct = undefined;
  }

  // Ajouter ou modifier un produit
  onSaveProduct(product: Product): void {
    if (product.id) {
      // Modifier le produit
      this.productService.update(product).subscribe(() => this.onRefreshList());
    } else {
      // Ajouter un nouveau produit
      this.productService.create(product).subscribe(() => this.onRefreshList());
    }
    this.selectedProduct = undefined;
  }

  // Supprimer un produit
  onDeleteProduct(product: Product): void {
    if (product.id) {
      this.productService.delete(product.id).subscribe(() => this.onRefreshList());
    }
  }
}
