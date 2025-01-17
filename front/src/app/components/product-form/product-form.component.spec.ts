import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Product } from '../../Model/product';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should populate form when selectedProduct changes', () => {
    const mockProduct: Product = {
      id: 1,
      nom: 'Papier Premium',
      texture: 'Lisse',
      grammage: '150 gr',
      couleur: 'Doré',
    };

    component.selectedProduct = mockProduct;
    component.ngOnChanges({
      selectedProduct: {
        currentValue: mockProduct,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.productForm.value).toEqual({
      nom: 'Papier Premium',
      texture: 'Lisse',
      grammage: '150 gr',
      couleur: 'Doré',
    });
  });
});
