import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { IShoppingItem } from 'src/app/shared/interfaces/i-shopping-item';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  public shoppingList: IShoppingItem[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.getShoppingItems();
  }

  getShoppingItems() {
    this.shoppingList = this.shoppingListService.getItems();
  }
}
