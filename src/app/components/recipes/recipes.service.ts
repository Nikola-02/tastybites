import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private http: HttpClient) {
    this.fetchRecipes();
  }

  fetchRecipes(limit = 6, page = 1, search = '', sortBy = '') {
    const url = new URL('https://660c5f723a0766e85dbe03c7.mockapi.io/recipes');
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('page', page.toString());

    //Dodaj filtere
    // url.searchParams.append('author', 'Sophia Nguyen');
    // url.searchParams.append('category', 'lunch');

    if (search != '') {
      url.searchParams.append('name', search);
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

    return this.http.get<Recipe[]>(url.toString()).pipe(
      map((recipes) => {
        return recipes.map((recipe) => ({
          ...recipe,
          category: recipe.category.toUpperCase(),
          description: this.trimAndAppendDots(recipe.description),
        }));
      })
    );
  }

  getAllRecipesForTotalPages(search = '') {
    const url = new URL('https://660c5f723a0766e85dbe03c7.mockapi.io/recipes');

    if (search != '') {
      url.searchParams.append('name', search);
    }

    return this.http.get<Recipe[]>(url.toString());
  }

  getRecipeById(id: string): Observable<Recipe> {
    let url = 'https://660c5f723a0766e85dbe03c7.mockapi.io/recipes/' + id;

    return this.http.get<Recipe>(url);
  }

  private trimAndAppendDots(description: string): string {
    if (description.length > 65) {
      return description.slice(0, 65) + '...';
    } else {
      return description;
    }
  }
}
