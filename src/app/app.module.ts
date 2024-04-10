import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/fixed/nav/nav.component';
import { FooterComponent } from './components/fixed/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PopularRecipeComponent } from './components/home/popular-recipe/popular-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    RecipesComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ContactUsComponent,
    PopularRecipeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
