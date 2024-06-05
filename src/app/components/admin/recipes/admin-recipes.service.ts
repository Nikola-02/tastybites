import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs-compat/operator/map';
import { IRecipe } from 'src/app/shared/interfaces/i-recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private http: HttpClient) {}

  getAllRecipesForDashboard() {
    const url = '../../../../assets/json/recipes.json';

    return this.http.get<IRecipe[]>(url);
  }
}
