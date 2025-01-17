import { Injectable } from '@angular/core';
import { Product} from '../Model/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  public constructor(private _httpClient: HttpClient){
  }

  public get(){
    return this._httpClient.get<Product[]>('/api/Product');
  }

  public add(Product: Product){
    return this._httpClient.post('/api/Product', Product);
  }

  public put(Product: Product){
    return this._httpClient.put('/api/Product/' + Product.id, Product);
  }
}
