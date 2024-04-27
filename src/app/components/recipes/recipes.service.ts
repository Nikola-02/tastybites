import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRecipe } from '../../shared/interfaces/i-recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private http: HttpClient) {
    this.fetchRecipes();
  }

  fetchRecipes(
    limit = 6,
    page = 1,
    search = '',
    sortBy = '',
    author = '',
    category = ''
  ) {
    const url = '../../../assets/json/recipes.json';

    return this.http.get<IRecipe[]>(url).pipe(
      map((recipes) => {
        return recipes.map((recipe) => ({
          ...recipe,
          category: recipe.category.toUpperCase(),
          description: this.trimAndAppendDots(recipe.description),
        }));
      }),
      map((newRecipes) => {
        //Filters
        newRecipes = this.filterRecipes(newRecipes, search, author, category);

        let filteredRecipes = newRecipes;

        //Sort

        filteredRecipes = this.sortRecipes(filteredRecipes, sortBy);

        //Pagination

        let startIndex = limit * (page - 1);
        let endIndex = limit * page;

        return filteredRecipes.slice(startIndex, endIndex);
      })
    );
  }

  filterRecipes(
    recipes: IRecipe[],
    search: string,
    author: string,
    category: string
  ): IRecipe[] {
    if (search) {
      recipes = recipes.filter((r) => {
        return r.name.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (author) {
      recipes = recipes.filter((r) => {
        return r.author.toLowerCase() == author.toLowerCase();
      });
    }

    if (category) {
      recipes = recipes.filter((r) => {
        return r.category.toLowerCase() == category.toLowerCase();
      });
    }

    return recipes;
  }

  sortRecipes(recipes: IRecipe[], sortBy: string) {
    if (sortBy && recipes.length) {
      if (sortBy == 'asc-rating') {
        recipes.sort((a, b) => {
          return a.rating - b.rating;
        });
      }

      if (sortBy == 'desc-rating') {
        recipes.sort((a, b) => {
          return b.rating - a.rating;
        });
      }

      if (sortBy == 'asc-name') {
        recipes.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }

          if (a.name > b.name) {
            return 1;
          }

          return 0;
        });
      }

      if (sortBy == 'desc-name') {
        recipes.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }

          if (a.name < b.name) {
            return 1;
          }

          return 0;
        });
      }
    }

    return recipes;
  }

  getAllRecipesForTotalPages(search = '', author = '', category = '') {
    const url = '../../../assets/json/recipes.json';

    return this.http.get<IRecipe[]>(url).pipe(
      map((recipes: IRecipe[]) => {
        recipes = this.filterRecipes(recipes, search, author, category);
        return recipes;
      })
    );
  }

  getRecipeById(id: string): Observable<IRecipe | undefined> {
    const url = '../../../assets/json/recipes.json';
    //let url = 'https://660c5f723a0766e85dbe03c7.mockapi.io/recipes/' + id;

    return this.http.get<IRecipe[]>(url).pipe(
      map((recipes: IRecipe[]) => {
        return recipes.map((recipe) => ({
          ...recipe,
          category: recipe.category.toUpperCase(),
          description: this.trimAndAppendDots(recipe.description),
        }));
      }),
      map((updatedRecipes: IRecipe[]) => {
        return updatedRecipes.find((r: IRecipe) => r.id === id);
      })
    );

    //return this.http.get<IRecipe>(url);
  }

  getFilters() {
    const authorsUrl = '../../../assets/json/authors.json';
    const categoriesUrl = '../../../assets/json/categories.json';

    let authors = this.getAuthors(authorsUrl);
    let categories = this.getAuthors(categoriesUrl);

    return { authors: authors, categories: categories };
  }

  getAuthors(url: string) {
    return this.http.get<string[]>(url);
  }

  getCategories(url: string) {
    return this.http.get<string[]>(url);
  }

  private trimAndAppendDots(description: string): string {
    if (description.length > 63) {
      return description.slice(0, 63) + '...';
    } else {
      return description;
    }
  }
}
