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
  public shoppingList: IShoppingItem[];
  private shoppingListSubscription: Subscription;
  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListSubscription =
      this.shoppingListService.shoppingList$.subscribe((list) => {
        this.shoppingList = list;
      });
  }

  onAddItem(form: NgForm) {
    if (form.valid) {
      this.shoppingListService.addItemToShoppingList(form.value);

      form.reset();
    }
  }

  deleteItem(id: number) {
    this.shoppingListService.deleteItemFromShoppingList(id);
  }

  onClearForm() {
    this.form.resetForm();
  }

  ngOnDestroy(): void {
    this.shoppingListSubscription.unsubscribe();
  }
}
