import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  private id: string;
  public recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
      console.log(this.id);
    });
  }

  getSingleRecipe() {
    let recipes = this.recipeService.recipes$.subscribe((recipes) => {
      return recipes;
    });
    console.log(recipes);
  }
}
