import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, last } from 'rxjs';
import { IIngredient } from 'src/app/shared/interfaces/i-ingredient';
import { IShoppingItem } from 'src/app/shared/interfaces/i-shopping-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  public shoppingList: IShoppingItem[] = [];

  //koristim ovde BehaviorSubject zato sto moze da drzi vrednost u sebi kod inicijalnog trazenja podataka
  private _shoppingListSubject: BehaviorSubject<IShoppingItem[]> =
    new BehaviorSubject<IShoppingItem[]>(this.shoppingList);

  shoppingList$ = this._shoppingListSubject.asObservable();

  constructor(private router: Router) {}

  addItemToShoppingList(newItem: IIngredient) {
    let lastId = 1;

    if (this.shoppingList.length > 0) {
      this.shoppingList.map((item: IShoppingItem) => {
        if (item.id >= lastId) {
          lastId = item.id;
        }
      });
    }

    let itemToAdd: IShoppingItem = {
      ...newItem,
      id: lastId + 1,
    };

    this.shoppingList.push(itemToAdd);

    this._shoppingListSubject.next(this.shoppingList);
  }

  addItemsToShoppingListFromRecipe(items: IIngredient[]) {
    let lastId = this.findLastIdInShoppingList();

    items.forEach((item, index) => {
      let itemToAdd: IShoppingItem = {
        ...item,
        id: lastId + 1 + index,
      };
      console.log(itemToAdd);

      this.shoppingList.push(itemToAdd);
    });

    this._shoppingListSubject.next(this.shoppingList);

    this.router.navigate(['/shopping-list']);
  }

  findLastIdInShoppingList(): number {
    let lastId = 1;

    if (this.shoppingList.length > 0) {
      this.shoppingList.map((item: IShoppingItem) => {
        if (item.id >= lastId) {
          lastId = item.id;
        }
      });
    }

    return lastId;
  }

  deleteItemFromShoppingList(id: number) {
    this.shoppingList = this.shoppingList.filter((item) => item.id != id);

    this._shoppingListSubject.next(this.shoppingList);
  }
}
