import { Component, OnDestroy, OnInit } from '@angular/core';
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
  public shoppingList: IShoppingItem[];
  private shoppingListSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListSubscription =
      this.shoppingListService.shoppingList$.subscribe((list) => {
        this.shoppingList = list;
      });
  }

  deleteItem(id: number) {
    this.shoppingListService.deleteItemFromShoppingList(id);
  }

  onClearForm(form: NgForm) {
    form.reset();
  }

  ngOnDestroy(): void {
    this.shoppingListSubscription.unsubscribe();
  }
}
