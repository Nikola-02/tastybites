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

  fetchRecipes() {
    let url = 'https://660c5f723a0766e85dbe03c7.mockapi.io/recipes';

    return this.http.get<Recipe[]>(url).pipe(
      map((recipes) => {
        return recipes.map((recipe) => ({
          ...recipe,
          category: recipe.category.toUpperCase(),
          description: this.trimAndAppendDots(recipe.description),
        }));
      })
    );
  }

  getRecipeById(id: string): Observable<Recipe> {
    let url = 'https://660c5f723a0766e85dbe03c7.mockapi.io/recipes/' + id;

    return this.http.get<Recipe>(url);
  }

  private trimAndAppendDots(description: string): string {
    if (description.length > 70) {
      return description.slice(0, 70) + '...';
    } else {
      return description;
    }
  }
}
