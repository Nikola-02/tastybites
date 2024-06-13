import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IShoppingItem } from 'src/app/shared/interfaces/i-shopping-item';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss'],
})
export class ShoppingItemComponent implements OnInit, OnDestroy {
  @Input('item') shoppingItem: IShoppingItem;
  @Output('deleteItemEmitter') deleteItemEmitter = new EventEmitter<number>();
  @Output('swapMode') swapMode = new EventEmitter<{
    item: IShoppingItem | null;
    mode: string;
  }>();
  @Input() turnOffEditModeEvent: Observable<number>;
  private turnOffEditModeSub: Subscription;

  public mode: string = 'create';

  ngOnInit(): void {
    this.turnOffEditModeSub = this.turnOffEditModeEvent.subscribe(
      (response) => {
        this.mode = 'create';

        if (this.shoppingItem.id == response) {
          this.onChangeMode();
        }
      }
    );
  }

  onDeleteItemFromShoppingList(id: number) {
    this.deleteItemEmitter.emit(id);
  }

  onChangeMode() {
    this.mode == 'create' ? (this.mode = 'edit') : (this.mode = 'create');
  }

  onNotifyParentForChangeMode() {
    if (this.mode == 'create') {
      this.swapMode.emit({
        item: this.shoppingItem,
        mode: this.mode == 'create' ? 'edit' : 'create',
      });
    } else {
      this.swapMode.emit({
        item: null,
        mode: this.mode == 'create' ? 'edit' : 'create',
      });
    }
  }

  ngOnDestroy(): void {
    if (this.turnOffEditModeSub) {
      this.turnOffEditModeSub.unsubscribe();
    }
  }

  // firstUppercase(word: string): string {
  //   if (!word) return '';

  //   return word.charAt(0).toUpperCase() + word.slice(1);
  // }
}
