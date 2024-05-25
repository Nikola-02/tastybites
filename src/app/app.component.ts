import { Component, OnInit } from '@angular/core';
import { IUser } from './shared/interfaces/i-user';
import { ISystemUser } from './shared/interfaces/i-system-user';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    let userArray: ISystemUser[] = [
      {
        id: 1,
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin',
      },
    ];

    let stringLocalStorageRegUsers = localStorage.getItem('registeredUsers');

    if (!stringLocalStorageRegUsers) {
      localStorage.setItem('registeredUsers', JSON.stringify(userArray));
    }

    this.authService.checkIfUserIsLoggedIn();
  }
}
