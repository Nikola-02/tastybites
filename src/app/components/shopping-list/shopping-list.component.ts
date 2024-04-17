import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { IShoppingItem } from 'src/app/shared/interfaces/i-shopping-item';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public shoppingList: IShoppingItem[] = [];
  private shoppingListSubscription: Subscription;
  public workMode: string = 'create';
  public itemToEditName: string;
  public itemToEditAmount: number;
  public itemToEditId: number;

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    //Get initial shopping list
    this.shoppingList = this.shoppingListService.getShoppingListFromLS();

    this.shoppingListSubscription =
      this.shoppingListService.shoppingList$.subscribe((list) => {
        this.shoppingList = list;
      });
  }

  onSubmitItem(form: NgForm) {
    if (form.valid) {
      if (this.workMode == 'edit') {
        this.shoppingListService.updateItemInShoppingList(
          form.value,
          this.itemToEditId
        );
      } else {
        this.shoppingListService.addItemToShoppingList(form.value);
      }

      form.reset();
    }
  }

  deleteItem(id: number) {
    if (id == this.itemToEditId) {
      this.form.reset();
      this.workMode = 'create';
      console.log(this.itemToEditName);
    }
    this.shoppingListService.deleteItemFromShoppingList(id);
  }

  onSwapMode(obj: { item: IShoppingItem | null; mode: string }) {
    this.workMode = obj.mode;
    if (obj.item && obj.mode == 'edit') {
      this.itemToEditId = obj.item.id;
      this.itemToEditName = obj.item.name;
      this.itemToEditAmount = obj.item.amount;
    } else {
      this.form.reset();
    }
  }

  onClearForm() {
    this.form.resetForm();
  }

  ngOnDestroy(): void {
    this.shoppingListSubscription.unsubscribe();
  }
}
