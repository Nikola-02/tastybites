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
    name: new FormControl('wad'),
    description: new FormControl('awd'),
    rating: new FormControl('5'),
    author: new FormControl('0'),
    category: new FormControl('0'),
    image: new FormControl(null),
    nutritionFacts: new FormGroup({
      calories: new FormControl('5'),
      carbs: new FormControl('5'),
      fat: new FormControl('5'),
      protein: new FormControl('5'),
      fiber: new FormControl('5'),
      cholesterol: new FormControl('5'),
      sodium: new FormControl('5'),
    }),
    times: new FormGroup({
      prep_time: new FormControl('5'),
      cook_time: new FormControl('5'),
      servings: new FormControl('5'),
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
    this.authorSubscription.unsubscribe();
    this.categorySubscription.unsubscribe();
    this.insertNewRecipeSub.unsubscribe();
  }
}
