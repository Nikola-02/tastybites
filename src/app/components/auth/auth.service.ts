import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ISystemUser } from 'src/app/shared/interfaces/i-system-user';
import { IUser } from 'src/app/shared/interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<ISystemUser> = new Observable<ISystemUser>();

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
        this.user = user[0];

        return user;
      }
    }

    return false;
  }
}
