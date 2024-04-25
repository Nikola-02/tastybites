import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipe } from '../../../shared/interfaces/i-recipe';
import { RecipesService } from '../recipes.service';
import { Subscription, filter, map, take } from 'rxjs';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private id: string;
  public dateTransformed: string = '';
  public recipe: IRecipe;
  private recipeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getSingleRecipe();
    });
  }

  getSingleRecipe() {
    this.recipeSub = this.recipeService
      .getRecipeById(this.id)
      .subscribe((recipe: IRecipe | undefined) => {
        if (recipe) {
          this.recipe = recipe;
          let date = new Date(this.recipe.created_at);
          this.dateTransformed =
            date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
          return;
        }

        this.router.navigate(['']);
      });
  }

  addIngredientsToShoppingList() {
    this.shoppingListService.addItemsToShoppingListFromRecipe(
      this.recipe.ingredients
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
