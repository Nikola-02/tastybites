import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public popularRecipes: Recipe[];
  private recipeSubscription: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.fetchPopularRecipes();
  }

  fetchPopularRecipes() {
    this.recipeSubscription = this.recipesService.recipes$
      .pipe(map((recipes) => recipes.slice(0, 3)))
      .subscribe((popularRecipes) => {
        this.popularRecipes = popularRecipes;
      });
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
