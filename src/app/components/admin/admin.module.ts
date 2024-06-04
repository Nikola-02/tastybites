import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EditRecipesComponent } from './recipes/edit-recipes/edit-recipes.component';
import { CreateRecipesComponent } from './recipes/create-recipes/create-recipes.component';
import { DashboardRecipesComponent } from './recipes/dashboard-recipes/dashboard-recipes.component';

@NgModule({
  declarations: [
    EditRecipesComponent,
    CreateRecipesComponent,
    DashboardRecipesComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
