import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  emailError: string;
  passwordError: string;
  usernameError: string;
  constructor(private authService: AuthService) {}

  register(f: NgForm) {
    this.authService.register(f.value);
  }
}
