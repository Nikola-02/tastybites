import { Component, OnInit } from '@angular/core';
import { AdminRecipesService } from '../admin-recipes.service';
import { Subscription } from 'rxjs';
import { IRecipe } from 'src/app/shared/interfaces/i-recipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-recipes',
  templateUrl: './edit-recipes.component.html',
  styleUrls: ['./edit-recipes.component.scss'],
})
export class EditRecipesComponent implements OnInit {
  getSingleRecipeSub: Subscription;
  recipe: IRecipe;

  constructor(
    private route: ActivatedRoute,
    private adminRecipesService: AdminRecipesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');

      this.getRecipeWithId(id);
    });
  }

  getRecipeWithId(id) {
    this.getSingleRecipeSub = this.adminRecipesService
      .getSingleRecipe(id)
      .subscribe({
        next: (response) => {
          this.recipe = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
