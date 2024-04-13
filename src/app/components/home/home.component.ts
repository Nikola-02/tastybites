import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
import { IRecipe } from '../../shared/interfaces/i-recipe';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public maxRating: number = 5;
  public popularRecipes: IRecipe[];
  private recipeSubscription: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.fetchPopularRecipes();
  }

  fetchPopularRecipes() {
    this.recipeSubscription = this.recipesService.fetchRecipes().subscribe(
      (response: IRecipe[]) => {
        this.popularRecipes = response.slice(0, 3);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
