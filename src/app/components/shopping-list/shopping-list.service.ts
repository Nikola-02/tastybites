import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IIngredient } from 'src/app/shared/interfaces/i-ingredient';
import { IShoppingItem } from 'src/app/shared/interfaces/i-shopping-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService implements OnInit {
  public shoppingList: IShoppingItem[] = [];

  //koristim ovde BehaviorSubject zato sto moze da drzi vrednost u sebi kod inicijalnog trazenja podataka
  private _shoppingListSubject: BehaviorSubject<IShoppingItem[]> =
    new BehaviorSubject<IShoppingItem[]>(this.getShoppingListFromLS());

  shoppingList$ = this._shoppingListSubject.asObservable();

  constructor(private router: Router) {}

  ngOnInit(): void {
    //Dohvatanje liste iz LS
    this.shoppingList = this.getShoppingListFromLS();
  }

  getShoppingListFromLS() {
    let shoppingList = localStorage.getItem('shoppingList') ?? null;

    if (shoppingList) {
      return JSON.parse(shoppingList);
    }

    this.setShoppingListToLS();
    return [];
  }

  setShoppingListToLS(): void {
    localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
  }

  addItemToShoppingList(newItem: IIngredient) {
    this.shoppingList = this.getShoppingListFromLS();

    let lastId = this.findLastIdInShoppingList();

    let itemToAdd: IShoppingItem = {
      ...newItem,
      id: lastId + 1,
    };

    this.shoppingList.push(itemToAdd);

    this._shoppingListSubject.next(this.shoppingList);

    this.setShoppingListToLS();
  }

  updateItemInShoppingList(newValues: IIngredient, id: number) {
    this.shoppingList = this.getShoppingListFromLS();

    this.shoppingList = this.shoppingList.map((item) => {
      if (item.id == id) {
        item.name = newValues.name;
        item.amount = newValues.amount;
      }

      return item;
    });

    this._shoppingListSubject.next(this.shoppingList);

    this.setShoppingListToLS();
  }

  addItemsToShoppingListFromRecipe(items: IIngredient[]) {
    this.shoppingList = this.getShoppingListFromLS();

    let lastId = this.findLastIdInShoppingList();

    items.forEach((item, index) => {
      let itemToAdd: IShoppingItem = {
        ...item,
        id: lastId + 1 + index,
      };

      this.shoppingList.push(itemToAdd);
    });

    this._shoppingListSubject.next(this.shoppingList);

    this.setShoppingListToLS();

    this.router.navigate(['/shopping-list']);
  }

  deleteItemFromShoppingList(id: number) {
    this.shoppingList = this.getShoppingListFromLS();

    this.shoppingList = this.shoppingList.filter((item) => item.id != id);

    this._shoppingListSubject.next(this.shoppingList);

    this.setShoppingListToLS();
  }

  findLastIdInShoppingList(): number {
    let lastId = 0;

    if (this.shoppingList.length > 0) {
      this.shoppingList.map((item: IShoppingItem) => {
        if (item.id >= lastId) {
          lastId = item.id;
        }
      });
    }

    return lastId;
  }
}
