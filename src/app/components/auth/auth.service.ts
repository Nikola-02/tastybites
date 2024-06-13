import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ISystemUser } from 'src/app/shared/interfaces/i-system-user';
import { IUser } from 'src/app/shared/interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  user$ = new BehaviorSubject<ISystemUser | null>(null);
  user: ISystemUser | null;

  ngOnInit(): void {
    this.checkIfUserIsLoggedIn();
  }

  checkIfUserIsLoggedIn() {
    let loginUserString: string | null = localStorage.getItem('loginUser');

    if (loginUserString) {
      let loginUser = JSON.parse(loginUserString);

      this.user = loginUser;
      this.user$.next(loginUser);
    }
  }

  register(formValues: IUser) {
    let registeredUsersString: string | null =
      localStorage.getItem('registeredUsers');

    if (registeredUsersString) {
      let registeredUsers = JSON.parse(registeredUsersString);

      let userWithSameEmail = registeredUsers.filter(
        (user: IUser) => user.email === formValues.email
      );

      if (userWithSameEmail.length > 0) {
        return {
          error: true,
          message: 'User with same email already registered.',
        };
      }

      let lastUser: ISystemUser = registeredUsers[registeredUsers.length - 1];

      let newUser: ISystemUser = {
        id: lastUser.id + 1,
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        role: 'user',
      };

      registeredUsers.push(newUser);

      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }

    return { error: false };
  }

  login(formValues: { email: string; password: string }) {
    let registeredUsersString: string | null =
      localStorage.getItem('registeredUsers');

    if (registeredUsersString) {
      let registeredUsers = JSON.parse(registeredUsersString);

      let user = registeredUsers.filter(
        (user: IUser) =>
          user.email === formValues.email &&
          user.password === formValues.password
      );

      if (user.length == 1) {
        this.user = user[0];
        localStorage.setItem('loginUser', JSON.stringify(this.user));

        this.user$.next(this.user);

        return user;
      }
    }

    return false;
  }

  logout() {
    this.user = null;

    this.user$.next(null);

    localStorage.removeItem('loginUser');
  }

  isAdmin() {
    return this.user && this.user.role == 'admin';
  }
}
