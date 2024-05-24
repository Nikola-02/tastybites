import { Component, OnInit } from '@angular/core';
import { IUser } from './shared/interfaces/i-user';
import { ISystemUser } from './shared/interfaces/i-system-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let userArray: ISystemUser[] = [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin',
      },
    ];

    localStorage.setItem('registeredUsers', JSON.stringify(userArray));
  }
}
