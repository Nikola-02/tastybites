import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IRecipe } from 'src/app/shared/interfaces/i-recipe';

@Injectable({
  providedIn: 'root',
})
export class AdminRecipesService {
  constructor(private http: HttpClient) {}

  getAllRecipesForDashboard() {
    const url = '../../../../assets/json/recipes.json';

    return this.http.get<IRecipe[]>(url).pipe(
      map((recipes: IRecipe[]) => {
        recipes = recipes.map((recipe: IRecipe) => {
          let date = new Date(recipe.created_at);

          recipe.created_at =
            date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

          return recipe;
        });
        return recipes;
      })
    );
  }

  deleteRecipe(id: number) {
    const url = 'http://localhost:5000/api/recipes/' + id;

    return this.http.delete(url);
  }
}
