import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EditRecipesComponent } from './recipes/edit-recipes/edit-recipes.component';
import { CreateRecipesComponent } from './recipes/create-recipes/create-recipes.component';
import { DashboardRecipesComponent } from './recipes/dashboard-recipes/dashboard-recipes.component';
import { NavComponent } from '../fixed/nav/nav.component';
import { FooterComponent } from '../fixed/footer/footer.component';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    EditRecipesComponent,
    CreateRecipesComponent,
    DashboardRecipesComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
