import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipes-model';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { FavoritesPost } from 'src/app/shared/central-posting-data.service';
@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss'],
})
export class RecipesItemComponent {
  ActivatedRoute: ActivatedRoute = inject(ActivatedRoute);
  recipesService: RecipesService = inject(RecipesService);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  dataPost: FavoritesPost = inject(FavoritesPost);

  addedToFav = false;
  @Input() recipeItem: Recipe;
  @Input() recipeId: number;

  navToDetails() {
    if (this.recipeId != null) {
      this.router.navigate(['/recipes', this.recipeId]);
    }
  }

  addToFav() {
    this.recipesService.addRecipesToFav(this.recipeItem);
    this.dataPost.postFavRecipes();
    this.addedToFav = true;
  }
}
