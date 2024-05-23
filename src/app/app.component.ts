import { Component, OnInit } from '@angular/core';
import { IUser } from './shared/interfaces/i-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let user: IUser = {};
    localStorage.setItem();
  }
}
