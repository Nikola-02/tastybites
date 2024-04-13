import { Component, Input } from '@angular/core';
import { IRecipe } from '../../../shared/interfaces/i-recipe';

@Component({
  selector: 'app-popular-recipe',
  templateUrl: './popular-recipe.component.html',
  styleUrls: ['./popular-recipe.component.scss'],
})
export class PopularRecipeComponent {
  @Input('item') item: IRecipe;
}
