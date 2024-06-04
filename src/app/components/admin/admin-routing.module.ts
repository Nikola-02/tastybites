import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRecipesComponent } from './recipes/dashboard-recipes/dashboard-recipes.component';
import { EditRecipesComponent } from './recipes/edit-recipes/edit-recipes.component';
import { CreateRecipesComponent } from './recipes/create-recipes/create-recipes.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'recipes/dashboard', component: DashboardRecipesComponent },
  { path: 'recipes/:id/edit', component: EditRecipesComponent },
  { path: 'recipes/create', component: CreateRecipesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
