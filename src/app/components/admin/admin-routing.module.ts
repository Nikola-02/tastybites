import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRecipesComponent } from './dashboard-recipes/dashboard-recipes.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';

const routes: Routes = [
  { path: '', redirectTo: 'prikaz', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardRecipesComponent },
  { path: 'update', component: UpdateRecipeComponent },
  { path: 'create', component: CreateRecipeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
