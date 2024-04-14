import { Injectable } from '@angular/core';
import { IIngredient } from 'src/app/shared/interfaces/i-ingredient';
import { IShoppingItem } from 'src/app/shared/interfaces/i-shopping-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  public shoppingList: IShoppingItem[];

  constructor() {}

  getItems() {
    return this.shoppingList;
  }
}
