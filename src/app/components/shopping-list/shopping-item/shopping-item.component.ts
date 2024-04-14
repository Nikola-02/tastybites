import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShoppingItem } from 'src/app/shared/interfaces/i-shopping-item';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss'],
})
export class ShoppingItemComponent {
  @Input('item') shoppingItem: IShoppingItem;
  @Output('deleteItemEmitter') deleteItemEmitter = new EventEmitter<number>();

  onDeleteItemFromShoppingList(id: number) {
    this.deleteItemEmitter.emit(id);
  }

  firstUppercase(word: string): string {
    if (!word) return ''; // Ako je reč prazna ili undefined, vratiti prazan string

    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
