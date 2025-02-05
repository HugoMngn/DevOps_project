import { Component, Input } from '@angular/core';
import { Product } from '../../Model/product';



@Component({
  selector: 'app-title',
  standalone: true,
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {

  title: string = 'Rock & Paper ®';

  @Input() currentProduct: Product | undefined;
}
