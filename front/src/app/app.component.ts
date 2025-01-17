import { Component } from '@angular/core';
import { Product } from './Model/product';
import { TitleComponent } from "./components/title/title.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { BehaviorSubject, Subject, switchMap, tap } from 'rxjs';
import { ProductService} from './service/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TitleComponent, ProductListComponent, ProductFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private _myRefreshObservable  = new BehaviorSubject<number>(1);

  constructor(private _ProductService: ProductService){

    this._myRefreshObservable
      .pipe(
        switchMap(()=> {
          return this._ProductService.get();
        }),
      ).subscribe((value)=>{
        this.products = value
    });
  }

    onRefreshList() {
    this._myRefreshObservable.next(1);
  }


  public products: Product[] = [
    {id:1 , nom:"Papier 1" ,texture:"Granulé fin" , grammage:"90 gr" , couleur:"Rouge" },
    {id:2 , nom:"Papier 2" ,texture:"Plastifié" , grammage:"70 gr" , couleur:"Doré" }
  ];
  public selectedProduct: Product | undefined;

  onSelectProduct($event: Product) {
    this.selectedProduct = $event;
  }

  onProductSelected(product: Product) {
    this.selectedProduct = product;
  }

  onCancelEdit() {
    this.selectedProduct = undefined;
  }

  onDeleteProduct(product: Product): void {
    this.products = this.products.filter(p => p.id !== product.id);
  }

  onSaveProduct(updatedProduct: Product) {
    if (updatedProduct.id != null) {
      const index = this.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
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
}

