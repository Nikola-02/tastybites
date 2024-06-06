import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminRecipesService } from '../admin-recipes.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-recipes',
  templateUrl: './create-recipes.component.html',
  styleUrls: ['./create-recipes.component.scss'],
})
export class CreateRecipesComponent implements OnInit, OnDestroy {
  ratings: number[] = [1, 2, 3, 4, 5];
  authors: any = [];
  categories: any = [];
  authorSubscription: Subscription;
  categorySubscription: Subscription;
  insertNewRecipeSub: Subscription;

  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    rating: new FormControl(''),
    author: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl(null),
    nutritionFacts: new FormGroup({
      calories: new FormControl(''),
      carbs: new FormControl(''),
      fat: new FormControl(''),
      protein: new FormControl(''),
      fiber: new FormControl(''),
      cholesterol: new FormControl(''),
      sodium: new FormControl(''),
    }),
    times: new FormGroup({
      prep_time: new FormControl(''),
      cook_time: new FormControl(''),
      servings: new FormControl(''),
    }),
    ingredients: new FormArray([
      new FormGroup({
        name: new FormControl(''),
        amount: new FormControl(''),
      }),
    ]),
  });

  constructor(private adminRecipesService: AdminRecipesService) {}

  ngOnInit(): void {
    this.authorSubscription = this.adminRecipesService
      .getAllForDdl('authors')
      .subscribe({
        next: (response) => {
          this.authors = response;
        },
        error: (error) => {
          console.log(error);
        },
      });

    this.categorySubscription = this.adminRecipesService
      .getAllForDdl('categories')
      .subscribe({
        next: (response) => {
          this.categories = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  pushNewIngredient() {
    const ingredientGroup = new FormGroup({
      name: new FormControl(''),
      amount: new FormControl(''),
    });
    this.ingredients.push(ingredientGroup);
  }

  removeIngredient(index: number) {
    if (this.ingredients.length > 1) this.ingredients.removeAt(index);
  }

  onImageChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image')?.setValue(file);
    }
  }

  submitForm() {
    const formData = new FormData();

    for (const control in this.form.controls) {
      let value = this.form.get(control)?.value;
      if (value) {
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        formData.append(control, value);
      }
    }

    this.insertNewRecipeSub = this.adminRecipesService
      .insertNewRecipe(formData)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.authorSubscription) this.authorSubscription.unsubscribe();
    if (this.categorySubscription) this.categorySubscription.unsubscribe();
    if (this.insertNewRecipeSub) this.insertNewRecipeSub.unsubscribe();
  }
}
