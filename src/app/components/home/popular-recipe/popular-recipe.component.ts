import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipes/recipe.model';

@Component({
  selector: 'app-popular-recipe',
  templateUrl: './popular-recipe.component.html',
  styleUrls: ['./popular-recipe.component.scss'],
})
export class PopularRecipeComponent {
  @Input('item') item: Recipe;
}
