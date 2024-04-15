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
    const url = new URL('https://660c5f723a0766e85dbe03c7.mockapi.io/recipes');
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('page', page.toString());

    if (search != '') {
      url.searchParams.append('name', search);
    }

    if (author != '') {
      url.searchParams.append('author', author);
    }

    if (category != '') {
      url.searchParams.append('category', category);
    }

    if (sortBy != '0') {
      if (sortBy == 'asc-rating') {
        url.searchParams.append('sortBy', 'rating');
      }

      if (sortBy == 'desc-rating') {
        url.searchParams.append('sortBy', 'rating');
        url.searchParams.append('order', 'desc');
      }

      if (sortBy == 'asc-name') {
        url.searchParams.append('sortBy', 'name');
      }

      if (sortBy == 'desc-name') {
        url.searchParams.append('sortBy', 'name');
        url.searchParams.append('order', 'desc');
      }
    }

    return this.http.get<IRecipe[]>(url.toString()).pipe(
      map((recipes) => {
        return recipes.map((recipe) => ({
          ...recipe,
          category: recipe.category.toUpperCase(),
          description: this.trimAndAppendDots(recipe.description),
        }));
      })
    );
  }

  getAllRecipesForTotalPages(search = '', author = '', category = '') {
    const url = new URL('https://660c5f723a0766e85dbe03c7.mockapi.io/recipes');

    if (search != '') {
      url.searchParams.append('name', search);
    }

    if (author != '') {
      url.searchParams.append('author', author);
    }

    if (category != '') {
      url.searchParams.append('category', category);
    }

    return this.http.get<IRecipe[]>(url.toString());
  }

  getRecipeById(id: string): Observable<IRecipe> {
    let url = 'https://660c5f723a0766e85dbe03c7.mockapi.io/recipes/' + id;

    return this.http.get<IRecipe>(url);
  }

  private trimAndAppendDots(description: string): string {
    if (description.length > 63) {
      return description.slice(0, 63) + '...';
    } else {
      return description;
    }
  }
}
