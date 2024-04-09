import { Component, OnInit } from '@angular/core';
import { RecipesService } from './components/recipes/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipesService.fetchRecipes();
  }
}
