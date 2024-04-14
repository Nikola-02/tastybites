import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  @Input('entity') entity: string;
  @Input('entityName') entityName: string;
  @Output('valueChanged') valueChanged = new EventEmitter<{
    value: string;
    entityName: string;
  }>();

  onChange(event: Event) {
    let value = (event.target as HTMLInputElement).value;

    this.valueChanged.emit({ value: value, entityName: this.entityName });
  }

  firstUppercaseLetter(word: string): string {
    word = word.toLowerCase();
    if (!word) return '';

    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
