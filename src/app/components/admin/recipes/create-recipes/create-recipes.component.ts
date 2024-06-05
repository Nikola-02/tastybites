import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminRecipesService } from '../admin-recipes.service';

@Component({
  selector: 'app-create-recipes',
  templateUrl: './create-recipes.component.html',
  styleUrls: ['./create-recipes.component.scss'],
})
export class CreateRecipesComponent implements OnInit {
  ratings: number[] = [1, 2, 3, 4, 5];
  authors: any = [];
  categories: any = [];
  ingredientsCounterArray: number[] = [1];
  authorSubscription: Subscription;
  categorySubscription: Subscription;

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

  pushNewIngredient() {
    let lastId = Math.max(...this.ingredientsCounterArray);

    this.ingredientsCounterArray.push(lastId + 1);
  }

  removeIngredient(id: number) {
    this.ingredientsCounterArray = this.ingredientsCounterArray.filter(
      (x) => x != id
    );
  }
}
