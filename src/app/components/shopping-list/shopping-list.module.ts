import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { authGuard, shopRecipes } from 'src/app/services/auth/recipes.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [ShoppingListComponent, PaymentComponent],
  imports: [
    SharedModule,
    ModalModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: ShoppingListComponent,
        canActivate: [authGuard],
        resolve: { recipes: shopRecipes },
        children: [
          {
            path: 'payment',
            component: PaymentComponent,
          },
        ],
      },
    ]),
  ],
  exports: [],
})
export class ShoppingList {}
