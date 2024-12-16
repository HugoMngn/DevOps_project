import { Component } from '@angular/core';
import { Product } from './Model/product';
import { TitleComponent } from "./components/title/title.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";


 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TitleComponent, ProductListComponent, ProductFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 
  public products: Product[] = [
    {id:1 , nom:"Papier 1 " ,texture:"Lisse" , grammage:"80gr" , couleur:"blanc" },
    {id:2 , nom:"Papier 2" ,texture:"Grain fin" , grammage:"120gr" , couleur:"écru" }
  ];
  public selectedProduct: Product | undefined;

  onSelectProduct($event: Product) {
    this.selectedProduct = $event;
  }

  onProductSelected(product: Product) {
    this.selectedProduct = product;
  }

  onSaveProduct(updatedProduct: Product) {
    if (this.selectedProduct) {
      const index = this.products.findIndex((p) => p.id === this.selectedProduct?.id);
      if (index !== -1) {
        updatedProduct.id = this.selectedProduct.id;
        this.products[index] = updatedProduct;
      }
    } else {
      if (this.products.length > 0) {
        const lastProductId = this.products[this.products.length - 1].id;
        updatedProduct.id = lastProductId + 1;
      } else {
        updatedProduct.id = 1;
      }
      this.products.push(updatedProduct);
    }
  }

  onCancelEdit() {
    this.selectedProduct = undefined;
  }
}

