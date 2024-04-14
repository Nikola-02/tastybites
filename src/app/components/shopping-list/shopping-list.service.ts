import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IIngredient } from 'src/app/shared/interfaces/i-ingredient';
import { IShoppingItem } from 'src/app/shared/interfaces/i-shopping-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  public shoppingList: IShoppingItem[] = [
    {
      id: 1,
      name: 'Bread',
      amount: 10,
    },
    {
      id: 2,
      name: 'Tomato',
      amount: 1,
    },
    {
      id: 3,
      name: 'Honey',
      amount: 2,
    },
  ];

  //koristim ovde BehaviorSubject zato sto moze da drzi vrednost u sebi kod inicijalnog trazenja podataka
  private _shoppingListSubject: BehaviorSubject<IShoppingItem[]> =
    new BehaviorSubject<IShoppingItem[]>(this.shoppingList);

  shoppingList$ = this._shoppingListSubject.asObservable();

  constructor() {}

  addItemToShoppingList(formObj: IIngredient) {
    this._shoppingListSubject.next(this.shoppingList);
  }

  deleteItemFromShoppingList(id: number) {
    this.shoppingList = this.shoppingList.filter((item) => item.id != id);
    this._shoppingListSubject.next(this.shoppingList);
  }
}
