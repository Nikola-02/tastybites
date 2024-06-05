import { Component, OnInit } from '@angular/core';
import { AdminRecipesService } from '../admin-recipes.service';
import { IRecipe } from 'src/app/shared/interfaces/i-recipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-recipes',
  templateUrl: './dashboard-recipes.component.html',
  styleUrls: ['./dashboard-recipes.component.scss'],
})
export class DashboardRecipesComponent implements OnInit {
  recipes: IRecipe[] = [];
  sub: Subscription;
  constructor(private adminRecipesService: AdminRecipesService) {}

  ngOnInit(): void {
    this.sub = this.adminRecipesService.getAllRecipesForDashboard().subscribe({
      next: (response) => {
        this.recipes = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
