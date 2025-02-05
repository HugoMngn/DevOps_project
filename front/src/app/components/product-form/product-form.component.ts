import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { Product } from '../../Model/product';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthModule } from 'angular-auth-oidc-client';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AuthModule,],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  @Input() selectedProduct: Product | undefined;
  @Output() saveProduct = new EventEmitter<Product>();
  @Output() cancelEdit = new EventEmitter<void>();

  productForm: FormGroup;
  isNewProduct: boolean = false;
  userName: string | null = null;

  constructor(private oidcSecurityService: OidcSecurityService) {
    this.productForm = new FormGroup({
      id: new FormControl(),
      nom: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern(/^Papier\s.*$/)]),
      texture: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      grammage: new FormControl('', [Validators.required, Validators.pattern(/^\d+\s?gr$/)]),
      couleur: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData }) => {
      if (isAuthenticated) {
        this.userName = userData?.preferred_username || userData?.name;
      }
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe(() => {
      window.location.href = 'http://localhost:8085/realms/paper/protocol/openid-connect/logout?redirect_uri=' + window.location.origin;
    });
  }

  public onNew() {
    this.selectedProduct = undefined;
    this.isNewProduct = true;
    this.productForm.reset();
  }

  public onCancel() {
    this.cancelEdit.emit();
    this.isNewProduct = false;
    this.productForm.reset();
  }


  public onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: Product = this.productForm.value;
      this.saveProduct.emit(updatedProduct);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProduct']) {
      if (this.selectedProduct) {
        this.isNewProduct = false;
        this.productForm.setValue(
          this.selectedProduct
        );
      } else {
        this.productForm.reset();
      }
    }
  }

  public showFieldError(fieldName: string, errorKind: string = ''): boolean {
    const control = this.productForm.get(fieldName);
    if (control?.touched) {
      return errorKind ? control.errors?.[errorKind] : !control.valid;
    }
    return false;
  }
}
