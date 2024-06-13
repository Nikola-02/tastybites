import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AuthorComponent } from './components/author/author.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AdminLayoutComponent } from './components/layout/admin-layout/admin-layout.component';
import { adminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'recipes',
        loadChildren: () =>
          import('./components/recipes/recipes.module').then(
            (m) => m.RecipesModule
          ),
      },
      {
        path: 'shopping-list',
        loadChildren: () =>
          import('./components/shopping-list/shopping-list.module').then(
            (m) => m.ShoppingListModule
          ),
      },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'author', component: AuthorComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivateChild: [adminGuard],
        loadChildren: () =>
          import('./components/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
