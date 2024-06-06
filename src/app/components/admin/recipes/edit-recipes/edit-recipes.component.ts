import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminRecipesService } from '../admin-recipes.service';
import { Subscription } from 'rxjs';
import { IRecipe } from 'src/app/shared/interfaces/i-recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-recipes',
  templateUrl: './edit-recipes.component.html',
  styleUrls: ['./edit-recipes.component.scss'],
})
export class EditRecipesComponent implements OnInit, OnDestroy {
  getSingleRecipeSub: Subscription;
  recipe: IRecipe;
  authors: any = [];
  categories: any = [];
  authorSubscription: Subscription;
  categorySubscription: Subscription;
  updateNewRecipeSub: Subscription;
  ratings: number[] = [1, 2, 3, 4, 5];

  form: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminRecipesService: AdminRecipesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');

      this.getRecipeWithId(id);
    });

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

  getRecipeWithId(id) {
    this.getSingleRecipeSub = this.adminRecipesService
      .getSingleRecipe(id)
      .subscribe({
        next: (recipe) => {
          if (recipe) {
            this.recipe = recipe;

            this.setFormValues(recipe);
          } else {
            this.router.navigate(['/admin']);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  setFormValues(recipe: IRecipe) {
    console.log(recipe.name);

    this.form = new FormGroup({
      name: new FormControl(recipe.name),
      description: new FormControl(recipe.description),
      rating: new FormControl(recipe.rating),
      author: new FormControl(recipe.author),
      category: new FormControl(recipe.category),
      image: new FormControl(recipe.image),
      nutritionFacts: new FormGroup({
        calories: new FormControl(recipe.nutrition_facts.calories),
        carbs: new FormControl(recipe.nutrition_facts.carbs),
        fat: new FormControl(recipe.nutrition_facts.fat),
        protein: new FormControl(recipe.nutrition_facts.protein),
        fiber: new FormControl(recipe.nutrition_facts.fiber),
        cholesterol: new FormControl(recipe.nutrition_facts.cholesterol),
        sodium: new FormControl(recipe.nutrition_facts.sodium),
      }),
      times: new FormGroup({
        prep_time: new FormControl(recipe.times.prep_time),
        cook_time: new FormControl(recipe.times.cook_time),
        servings: new FormControl(recipe.times.servings),
      }),
      ingredients: new FormArray(
        recipe.ingredients.map(
          (ingredient) =>
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount),
            })
        )
      ),
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

    this.updateNewRecipeSub = this.adminRecipesService
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
    if (this.updateNewRecipeSub) this.updateNewRecipeSub.unsubscribe();
  }
}
