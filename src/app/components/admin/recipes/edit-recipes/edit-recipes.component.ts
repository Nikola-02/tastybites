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

  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    rating: new FormControl(0),
    author: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl(''),
    nutritionFacts: new FormGroup({
      calories: new FormControl(0),
      carbs: new FormControl(0),
      fat: new FormControl(0),
      protein: new FormControl(0),
      fiber: new FormControl(0),
      cholesterol: new FormControl(0),
      sodium: new FormControl(0),
    }),
    times: new FormGroup({
      prep_time: new FormControl(0),
      cook_time: new FormControl(0),
      servings: new FormControl(0),
    }),
    ingredients: new FormArray([
      new FormGroup({
        name: new FormControl(''),
        amount: new FormControl(''),
      }),
    ]),
  });

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
    const ingredientsArray = new FormArray(
      recipe.ingredients.map(
        (ingredient) =>
          new FormGroup({
            name: new FormControl(ingredient.name),
            amount: new FormControl(ingredient.amount?.toString()), // Pretvaramo amount u string
          })
      )
    );

    this.form.patchValue({
      name: recipe.name,
      description: recipe.description,
      rating: recipe.rating,
      author: recipe.author,
      category: recipe.category,
      image: recipe.image,
      nutritionFacts: {
        calories: recipe.nutrition_facts.calories,
        carbs: recipe.nutrition_facts.carbs,
        fat: recipe.nutrition_facts.fat,
        protein: recipe.nutrition_facts.protein,
        fiber: recipe.nutrition_facts.fiber,
        cholesterol: recipe.nutrition_facts.cholesterol,
        sodium: recipe.nutrition_facts.sodium,
      },
      times: {
        prep_time: recipe.times.prep_time,
        cook_time: recipe.times.cook_time,
        servings: recipe.times.servings,
      },
    });

    this.form.setControl('ingredients', ingredientsArray);
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
      .updateRecipe(formData, this.recipe.id)
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
