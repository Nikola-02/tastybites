import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { DashboardRecipesComponent } from './dashboard-recipes/dashboard-recipes.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';

@NgModule({
  declarations: [
    UpdateRecipeComponent,
    DashboardRecipesComponent,
    CreateRecipeComponent,
    UpdateRecipeComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
