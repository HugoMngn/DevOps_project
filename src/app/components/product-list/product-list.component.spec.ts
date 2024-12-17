import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { Product } from '../../Model/product';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let debugElement: DebugElement;

  const mockProducts: Product[] = [
    { id: 1, nom: 'Papier Premium', texture: 'Lisse', grammage: '120 gr', couleur: 'Blanc' },
    { id: 2, nom: 'Papier Basique', texture: 'Granuleux', grammage: '80 gr', couleur: 'Jaune' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    component.products = mockProducts; // Initialiser les produits simulés
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of products in the table', () => {
    const rows = debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(mockProducts.length);
  });

  it('should emit clickProduct event when a row (non-button) is clicked', () => {
    spyOn(component.clickProduct, 'emit');
    const firstRow = debugElement.query(By.css('tbody tr'));
    firstRow.nativeElement.click();

    expect(component.clickProduct.emit).toHaveBeenCalledWith(mockProducts[0]);
    expect(component.selectedProduct).toEqual(mockProducts[0]);
  });

  it('should not emit clickProduct event when a button is clicked', () => {
    spyOn(component.clickProduct, 'emit');
    const detailsButton = debugElement.query(By.css('.details-btn'));
    detailsButton.nativeElement.click();

    expect(component.clickProduct.emit).not.toHaveBeenCalled();
  });

  it('should toggle product details when Details button is clicked', () => {
    const detailsButton = debugElement.query(By.css('.details-btn'));
    detailsButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedProduct).toEqual(mockProducts[0]);

    // Cliquer à nouveau pour fermer les détails
    detailsButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.selectedProduct).toBeNull();
  });

  it('should emit deleteProduct event when Delete button is clicked and confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true); // Simuler confirmation
    spyOn(component.deleteProduct, 'emit');

    const deleteButton = debugElement.query(By.css('.delete-btn'));
    deleteButton.nativeElement.click();

    expect(window.confirm).toHaveBeenCalledWith('Êtes-vous sûr de vouloir supprimer le produit "Papier Premium" ?');
    expect(component.deleteProduct.emit).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('should not emit deleteProduct event when deletion is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false); // Simuler annulation
    spyOn(component.deleteProduct, 'emit');

    const deleteButton = debugElement.query(By.css('.delete-btn'));
    deleteButton.nativeElement.click();

    expect(window.confirm).toHaveBeenCalled();
    expect(component.deleteProduct.emit).not.toHaveBeenCalled();
  });
});
