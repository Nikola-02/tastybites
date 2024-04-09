import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  recipes$ = this.recipesSubject.asObservable();
  private recipes: Recipe[];

  constructor(private http: HttpClient) {}

  fetchRecipes() {
    let url = 'https://660c5f723a0766e85dbe03c7.mockapi.io/recipes';

    this.http.get(url).subscribe(
      (response: any) => {
        this.recipesSubject.next(response);
        this.recipes = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
