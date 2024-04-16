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
import { FormsModule } from '@angular/forms';
import { RecipeComponent } from './components/recipes/recipe/recipe.component';
import { StarsComponent } from './shared/abstract/stars/stars.component';
import { RadioComponent } from './shared/abstract/radio/radio.component';
import { ShoppingItemComponent } from './components/shopping-list/shopping-item/shopping-item.component';
import { AuthorComponent } from './components/author/author.component';

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
    RecipeComponent,
    StarsComponent,
    RadioComponent,
    ShoppingItemComponent,
    AuthorComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
