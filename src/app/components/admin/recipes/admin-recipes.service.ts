import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipe } from 'src/app/shared/interfaces/i-recipe';

@Injectable({
  providedIn: 'root',
})
export class AdminRecipesService {
  constructor(private http: HttpClient) {}

  getAllRecipesForDashboard() {
    const url = '../../../../assets/json/recipes.json';

    return this.http.get<IRecipe[]>(url);
  }
}
