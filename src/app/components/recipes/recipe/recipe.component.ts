import { Component, Input } from '@angular/core';
import { IRecipe } from '../../../shared/interfaces/i-recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  @Input('recipe') recipe: IRecipe;
}
