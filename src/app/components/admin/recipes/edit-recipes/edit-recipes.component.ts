import { Component, OnInit } from '@angular/core';
import { AdminRecipesService } from '../admin-recipes.service';
import { Subscription } from 'rxjs';
import { IRecipe } from 'src/app/shared/interfaces/i-recipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-recipes',
  templateUrl: './edit-recipes.component.html',
  styleUrls: ['./edit-recipes.component.scss'],
})
export class EditRecipesComponent implements OnInit {
  getSingleRecipeSub: Subscription;
  recipe: IRecipe;
  authors: any = [];
  categories: any = [];

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
  }

  getRecipeWithId(id) {
    this.getSingleRecipeSub = this.adminRecipesService
      .getSingleRecipe(id)
      .subscribe({
        next: (recipe) => {
          if (recipe) {
            this.recipe = recipe;
          } else {
            this.router.navigate(['/admin']);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
