import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  badCredentials = false;
  constructor(private authService: AuthService, private router: Router) {}

  login(f: NgForm) {
    let userOrFalse = this.authService.login(f.value);

    if (userOrFalse) {
      this.badCredentials = true;
      this.router.navigate(['/home']);
    } else {
      this.badCredentials = true;
      this.router.navigate(['/login']);
    }
  }
}
