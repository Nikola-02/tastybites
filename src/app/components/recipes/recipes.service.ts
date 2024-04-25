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
        let filteredRecipes = newRecipes;

        let startIndex = limit * (page - 1);
        let endIndex = limit * page;

        return filteredRecipes.slice(startIndex, endIndex);
      })
    );
  }

  getAllRecipesForTotalPages(search = '', author = '', category = '') {
    const url = '../../../assets/json/recipes.json';

    return this.http.get<IRecipe[]>(url).pipe(
      map((recipes: IRecipe[]) => {
        //Dodaj filtere za search, author i category
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

  private trimAndAppendDots(description: string): string {
    if (description.length > 63) {
      return description.slice(0, 63) + '...';
    } else {
      return description;
    }
  }
}
