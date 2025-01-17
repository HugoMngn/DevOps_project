import { Injectable } from '@angular/core';
import { Product } from '../Model/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = '/api/Product';

  public constructor(private _httpClient: HttpClient) { }

  // GET: Récupérer tous les produits
  public get(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.apiUrl);
  }

  // POST: Ajouter un produit
  public create(product: Product): Observable<any> {
    const { id, ...productWithoutId } = product;
    return this._httpClient.post(this.apiUrl, productWithoutId);
  }

  // PUT: Mettre à jour un produit
  public update(product: Product): Observable<any> {
    return this._httpClient.put(`${this.apiUrl}/${product.id}`, product);
  }

  // DELETE: Supprimer un produit
  public delete(id: number): Observable<any> {
    return this._httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
