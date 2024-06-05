import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IRecipe } from 'src/app/shared/interfaces/i-recipe';

@Injectable({
  providedIn: 'root',
})
export class AdminRecipesService {
  private baseJsonUrl: string = '../../../../assets/json/';
  constructor(private http: HttpClient) {}

  getAllRecipesForDashboard() {
    return this.http.get<IRecipe[]>(this.baseJsonUrl + 'recipes.json').pipe(
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

  getSingleRecipe(id): Observable<IRecipe | undefined> {
    return this.getAllRecipesForDashboard().pipe(
      map((recipes: IRecipe[]) => {
        return recipes.find((r) => r.id == id);
      })
    );
  }

  deleteRecipe(id: number) {
    const url = 'http://localhost:5000/api/recipes/' + id;

    return this.http.delete(url);
  }

  getAllForDdl(json: string) {
    return this.http.get(this.baseJsonUrl + json + '.json');
  }

  insertNewRecipe(formValues) {
    return this.http.post('http://localhost:5000/api/recipes/', formValues);
  }
}
