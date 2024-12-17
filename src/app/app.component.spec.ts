import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Product } from './Model/product';
import { TitleComponent } from './components/title/title.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const mockProducts: Product[] = [
    { id: 1, nom: 'Papier 1', texture: 'Granulé fin', grammage: '90 gr', couleur: 'Rouge' },
    { id: 2, nom: 'Papier 2', texture: 'Plastifié', grammage: '70 gr', couleur: 'Doré' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TitleComponent, ProductListComponent, ProductFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default products', () => {
    expect(component.products.length).toBe(2);
    expect(component.products).toEqual(mockProducts);
  });

  it('should select a product when onSelectProduct is called', () => {
    const selectedProduct = mockProducts[0];
    component.onSelectProduct(selectedProduct);

    expect(component.selectedProduct).toEqual(selectedProduct);
  });

  it('should deselect a product when onCancelEdit is called', () => {
    component.selectedProduct = mockProducts[0];
    component.onCancelEdit();

    expect(component.selectedProduct).toBeUndefined();
  });

  it('should delete a product when onDeleteProduct is called', () => {
    component.products = [...mockProducts];

    component.onDeleteProduct(mockProducts[0]);

    expect(component.products.length).toBe(1);
    expect(component.products[0]).toEqual(mockProducts[1]);
  });

  it('should update an existing product when onSaveProduct is called', () => {
    component.products = [...mockProducts];
    component.selectedProduct = mockProducts[0];

    const updatedProduct: Product = {
      id: mockProducts[0].id,
      nom: 'Papier Modifié',
      texture: 'Lisse',
      grammage: '100 gr',
      couleur: 'Bleu',
    };

    component.onSaveProduct(updatedProduct);

    expect(component.products[0]).toEqual(updatedProduct);
  });

  it('should add a new product when onSaveProduct is called without a selected product', () => {
    component.products = [...mockProducts];
    component.selectedProduct = undefined;

    const newProduct: Product = {
      id: 0, 
      nom: 'Papier Nouveau',
      texture: 'Mat',
      grammage: '120 gr',
      couleur: 'Vert',
    };

    component.onSaveProduct(newProduct);

    expect(component.products.length).toBe(3);
    expect(component.products[2]).toEqual({ ...newProduct, id: 3 });
  });

  it('should render the product list component', () => {
    const productListComponent = fixture.debugElement.query(By.css('app-product-list'));
    expect(productListComponent).toBeTruthy();
  });

  it('should render the product form component', () => {
    const productFormComponent = fixture.debugElement.query(By.css('app-product-form'));
    expect(productFormComponent).toBeTruthy();
  });
});
