import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription, filter, map, take } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private id: string;
  public dateTransformed: string = '';
  public recipe: Recipe;
  private recipeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getSingleRecipe();
    });
  }

  getSingleRecipe() {
    this.recipeSub = this.recipeService.getRecipeById(this.id).subscribe(
      (recipe) => {
        this.recipe = recipe;
        let date = new Date(this.recipe.created_at);
        this.dateTransformed =
          date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
      },
      (error) => {
        this.router.navigate(['']);
        console.log(error);
      }
    );
  }

  firstUppercase(word: string): string {
    if (!word) return ''; // Ako je reč prazna ili undefined, vratiti prazan string

    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }
}
