import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipes-model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  @Input() recipes: Recipe[];
  @Input() totalCost: number;
}
