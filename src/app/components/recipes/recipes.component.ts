import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  public page: number = 1;
  private perPage: number = 6;
  public totalPages: number;
  public search: string;
  public sort: string = '0';
  public recipes: Recipe[];
  categories: string[];
  authors: string[];
  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes() {
    this.recipesService
      .fetchRecipes(this.perPage, this.page, this.search, this.sort)
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
          this.getTotalPagesForRecipes();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getTotalPagesForRecipes() {
    this.recipesService
      .getAllRecipesForTotalPages(this.search)
      .subscribe((recipes: Recipe[]) => {
        this.totalPages = Math.ceil(recipes.length / this.perPage);

        this.categories = Array.from(
          new Set(recipes.map((recipe) => recipe.category))
        );
        this.authors = Array.from(
          new Set(recipes.map((recipe) => recipe.author))
        );
      });
  }

  setPage(newPage: number) {
    this.page = newPage;
    this.getRecipes();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getRecipes();
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getRecipes();
    }
  }

  firstUppercase(word: string): string {
    word = word.toLowerCase();
    if (!word) return ''; // Ako je reč prazna ili undefined, vratiti prazan string

    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  counter(i: number) {
    return new Array(i);
  }
}
