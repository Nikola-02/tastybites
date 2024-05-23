import { Component, OnInit } from '@angular/core';
import { IUser } from './shared/interfaces/i-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let userArray: IUser[] = [
      {
        username: 'user',
        email: 'user@gmail.com',
        password: 'user123',
      },
    ];

    localStorage.setItem('registeredUsers', JSON.stringify(userArray));
  }
}
