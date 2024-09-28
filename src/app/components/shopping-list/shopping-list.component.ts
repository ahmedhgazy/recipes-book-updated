import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipes-model';
import { recipeShopPost } from 'src/app/services/shoppingList/post-data.service';
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Ingredient } from 'src/app/models/ingredients.model';
// import { Ingredient } from 'src/app/DTO/ingredients.model';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private modalService: BsModalService) {}
  route: ActivatedRoute = inject(ActivatedRoute);
  modalRef?: BsModalRef;
  ingredients: Ingredient[] = [];
  recipes: Recipe[] = [];
  shopPost: recipeShopPost = inject(recipeShopPost);
  totalCost: number = 0;
  ShoppingService: ShoppingListService = inject(ShoppingListService);
  subscription: Subscription[] = [];
  dataPost: recipeShopPost = inject(recipeShopPost);
  prevShopList = [];
  @ViewChild('amount', { static: false }) amount: ElementRef;

  ngOnInit(): void {
    this.ingredients = this.ShoppingService.getIngredients();
    this.recipes = this.ShoppingService.getRecipes();
    this.recipes = this.route.snapshot.data['recipes'];
    this.subscription.push(
      this.ShoppingService.IngredientsSub.subscribe((IngredientsList) => {
        this.ingredients = IngredientsList;
      })
    );
    this.subscription.push(
      this.ShoppingService.RDIngredientsSub.subscribe((newIngredients) => {
        if (newIngredients != null || newIngredients != undefined) {
          this.ShoppingService.addNewIngredients(newIngredients);
        }
      })
    );
    this.subscription.push(
      this.ShoppingService.recipesSubject.subscribe((recipes) => {
        this.recipes = recipes;
      })
    );
  }

  passIndex(i) {
    this.ShoppingService.storeIngredientIndex.next(i);
  }

  @ViewChild('form', { static: false }) form: NgForm;

  calcTotalCost() {
    let totalCost = 0;
    for (let recipe of this.recipes) {
      totalCost += recipe.amount * recipe.price;
    }
    this.totalCost = totalCost;
    console.log(totalCost);
  }
  pay: boolean = false;
  onSubmit() {
    this.pay = true;
    this.calcTotalCost();
    this.form.reset();
  }
  cancelPay() {
    this.totalCost = 0;
    this.pay = false;
  }
  removeItem(index: number) {
    this.ShoppingService.removeItem(index);
    this.shopPost.postData();
  }
  index: number;

  openModal(recipe: Recipe, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmitPay(form: NgForm) {
    console.log(form.value);
  }
  logRecipes() {
    console.log(this.recipes);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
