import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  register(formValues: { username: string; email: string; password: string }) {
    console.log(formValues);
  }
}
