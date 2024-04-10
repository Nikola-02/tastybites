import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent {
  @Input('rating') rating: number;

  public maxRating: number = 5;
  counter(i: number) {
    return new Array(i);
  }
}
