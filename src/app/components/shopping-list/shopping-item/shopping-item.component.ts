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
  @Output('swapMode') swapMode = new EventEmitter<string>();
  public mode: string = 'create';

  onDeleteItemFromShoppingList(id: number) {
    this.deleteItemEmitter.emit(id);
  }

  onChangeMode() {
    if (this.mode == 'create') {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
    }

    this.swapMode.emit(this.mode);
  }

  firstUppercase(word: string): string {
    if (!word) return '';

    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
