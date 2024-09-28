import { Injectable, inject } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { HttpClient } from '@angular/common/http';
import { RecipesService } from '../recipes/recipes.service';
import { AuthService } from '../auth/auth.service';
import { map, tap } from 'rxjs';
import { Recipe } from 'src/app/models/recipes-model';

@Injectable({
  providedIn: 'root',
})
export class recipeShopPost {
  shopService: ShoppingListService = inject(ShoppingListService);
  recipeService: RecipesService = inject(RecipesService);
  http: HttpClient = inject(HttpClient);
  authService: AuthService = inject(AuthService);

  postData() {
    const recipes = this.shopService.getRecipes();
    const userId = this.authService.user.getValue().id;
    this.http
      .put<Recipe[]>(
        `https://recipes-book-review-default-rtdb.firebaseio.com/shop/${userId}.json`,
        recipes
      )
      .subscribe((recipes) => {
        console.log(recipes);
      });
  }

  getData() {
    const userId = this.authService.user.getValue().id;
    return this.http
      .get<Recipe[]>(
        `https://recipes-book-review-default-rtdb.firebaseio.com/shop/${userId}.json`
      )
      .pipe(
        map((recipes: Recipe[]) => {
          if (recipes) {
            return recipes.map((recipe: Recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            });
          } else {
            return [];
          }
        }),
        tap((recipes: Recipe[]) => {
          this.shopService.resetRecipes(recipes);
        })
      );
  }
}
