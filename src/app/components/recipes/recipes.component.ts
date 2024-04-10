import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  public search: string;
  public recipes: Recipe[];
  categories: string[];
  authors: string[];
  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipesService.fetchRecipes().subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;

        this.categories = Array.from(
          new Set(recipes.map((recipe) => recipe.category))
        );
        this.authors = Array.from(
          new Set(recipes.map((recipe) => recipe.author))
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  firstUppercase(word: string): string {
    word = word.toLowerCase();
    if (!word) return ''; // Ako je reč prazna ili undefined, vratiti prazan string

    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
