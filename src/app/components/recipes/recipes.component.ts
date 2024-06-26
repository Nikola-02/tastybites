import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';
import { IRecipe } from '../../shared/interfaces/i-recipe';
import { RadioComponent } from 'src/app/shared/abstract/radio/radio.component';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { __values } from 'tslib';

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
  observableFilter: any;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.getRecipes();
    this.getTotalPagesForRecipes();
    this.setFilters();
  }

  setSelectedFilters(data: { value: string; entityName: string }) {
    if (data.entityName === 'authors') this.author = data.value;

    if (data.entityName === 'category') this.category = data.value;

    this.getRecipes();
  }

  setFilters() {
    let filtersObservable = this.recipesService.getFilters();

    filtersObservable.authors.subscribe((authors) => {
      this.authors = authors;
    });

    filtersObservable.categories.subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit(ngForm: NgForm) {
    ngForm.reset();
  }

  clearFilters(form: NgForm) {
    this.author = '';
    this.category = '';

    form.reset();

    this.getRecipes();
  }

  getRecipes() {
    this.recipesService
      .fetchRecipes(
        this.perPage,
        this.page,
        this.search,
        this.sort,
        this.author,
        this.category
      )
      .subscribe((recipes: IRecipe[]) => {
        if (!recipes.length) {
          console.log('da');

          this.error = 'There is no recipes for this combination.';
          return;
        }
        this.error = '';
        this.recipes = recipes;
        this.getTotalPagesForRecipes();
      });
  }

  getTotalPagesForRecipes() {
    this.recipesService
      .getAllRecipesForTotalPages(this.search, this.author, this.category)
      .subscribe((recipes: IRecipe[]) => {
        this.totalPages = Math.ceil(recipes.length / this.perPage);
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
    if (!word) return '';

    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  counter(i: number) {
    return new Array(i);
  }
}
