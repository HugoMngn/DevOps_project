import { Component, Input } from '@angular/core';
import { Product } from '../../Model/product';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-title',
  standalone: true,
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  imports: [CommonModule],
})
export class TitleComponent {

  title: string = 'Rock & Paper ®';

  @Input() currentProduct: Product | undefined;
  public userName: string | null = null;  // Ajout pour stocker le nom de l'utilisateur


  constructor(private oidcSecurityService: OidcSecurityService) { }

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
    this.oidcSecurityService.logoff();
  }
}
