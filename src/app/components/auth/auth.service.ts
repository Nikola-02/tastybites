import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: IUser;
  constructor(private router: Router) {}

  register(formValues: IUser) {}

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
        return user;
      }

      return false;
    }

    return false;
  }
}
