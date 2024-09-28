import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredients.model';
import { Recipe } from 'src/app/models/recipes-model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  // constructor() {
  //   const ingredients = localStorage.getItem('ingredients');
  //   if (ingredients) {
  //     this.IngredientsList = JSON.parse(ingredients);
  //   }
  // }

  IngredientsList: Ingredient[] = [];
  // Recipes: Recipe[] = [];
  IngredientsSub = new Subject<Ingredient[]>();
  storeIngredientIndex = new Subject<number>();
  RDIngredientsSub = new BehaviorSubject<Ingredient[]>(null);
  RecipeSubject = new BehaviorSubject<Recipe>(null);

  getIngredients() {
    return this.IngredientsList.slice();
  }

  getSelectedIngredient(index: number) {
    return this.IngredientsList[index];
  }

  AddIngredients(ingredient: Ingredient) {
    this.IngredientsList.push(ingredient);
    this.IngredientsSub.next(this.IngredientsList);
    // this.updateLocalStorage();
  }

  updateIngredients(index: number, newIngredient: Ingredient) {
    this.IngredientsList[index] = newIngredient;
    this.IngredientsSub.next(this.IngredientsList);
    // this.updateLocalStorage();
  }

  deleteIngredient(index: number) {
    this.IngredientsList.splice(index, 1);
    this.IngredientsSub.next(this.IngredientsList);
    // this.updateLocalStorage();
  }

  clearIngredient() {
    this.IngredientsList = [];
    this.IngredientsSub.next(this.IngredientsList);
    // this.updateLocalStorage();
  }

  // private updateLocalStorage() {
  //   localStorage.setItem('ingredients', JSON.stringify(this.IngredientsList));
  // }

  addNewIngredients(newIngredients: Ingredient[]) {
    newIngredients.forEach((Ingredient) => {
      if (
        !this.IngredientsList.some((x) =>
          this.areIngredientEqual(x, Ingredient)
        )
      ) {
        this.IngredientsList.push(...newIngredients);
        this.IngredientsSub.next(this.IngredientsList);
      }
    });

    // this.updateLocalStorage();
  }

  // {name:string,amount:number}
  areIngredientEqual(
    ingredients: Ingredient,
    newIngredients: Ingredient
  ): boolean {
    return (
      ingredients.name === newIngredients.name &&
      ingredients.amount === newIngredients.amount
    );
  }

  recipes: Recipe[] = [];
  recipesSubject = new Subject<Recipe[]>();

  getRecipes() {
    if (
      // this.recipes.length != 0 ||
      this.recipes != null ||
      this.recipes != undefined
    ) {
      return this.recipes.slice();
    } else {
      return null;
    }
  }

  addRecipe(newRecipe: Recipe) {
    if (!this.recipes.includes(newRecipe)) {
      this.recipes.push(newRecipe);
      this.recipesSubject.next(this.recipes);
    }
  }

  resetRecipes(newRecipes: Recipe[]) {
    this.recipes = newRecipes;
    this.recipesSubject.next(newRecipes);
  }
  removeItem(index: number) {
    this.recipes.splice(index, 1);

    this.recipesSubject.next(this.recipes.slice());
  }
}
