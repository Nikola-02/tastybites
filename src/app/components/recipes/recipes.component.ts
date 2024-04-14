import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';
import { IRecipe } from '../../shared/interfaces/i-recipe';
import { RadioComponent } from 'src/app/shared/abstract/radio/radio.component';
import { NgForm } from '@angular/forms';

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
  public recipes: IRecipe[];
  public author: string;
  public category: string;
  categories: string[];
  authors: string[];
  error: string;
  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.getRecipes(true);
  }

  setSelectedFilters(data: { value: string; entityName: string }) {
    if (data.entityName === 'authors') this.author = data.value;

    if (data.entityName === 'category') this.category = data.value;

    this.getRecipes();
  }

  clearFilters(catForm: NgForm, autForm: NgForm) {
    this.author = '';
    this.category = '';
    catForm.reset();
    autForm.reset();

    this.getRecipes();
  }

  getRecipes(init: boolean = false) {
    this.recipesService
      .fetchRecipes(
        this.perPage,
        this.page,
        this.search,
        this.sort,
        this.author,
        this.category
      )
      .subscribe(
        (recipes: IRecipe[]) => {
          this.error = '';
          this.recipes = recipes;
          this.getTotalPagesForRecipes(init);
        },
        (error) => {
          this.error = 'There is no recipes for this combination.';
        }
      );
  }

  getTotalPagesForRecipes(init: boolean = false) {
    this.recipesService
      .getAllRecipesForTotalPages(this.search, this.author, this.category)
      .subscribe((recipes: IRecipe[]) => {
        this.totalPages = Math.ceil(recipes.length / this.perPage);

        if (init) this.initSetFilters(recipes);
      });
  }

  initSetFilters(recipes: IRecipe[]) {
    this.categories = Array.from(
      new Set(recipes.map((recipe) => recipe.category))
    );
    this.authors = Array.from(new Set(recipes.map((recipe) => recipe.author)));
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
    if (!word) return '';

    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  counter(i: number) {
    return new Array(i);
  }
}
