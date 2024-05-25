import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  error = '';
  constructor(private authService: AuthService, private router: Router) {}

  register(f: NgForm) {
    let userOrError: any = this.authService.register(f.value);

    if (!userOrError.error) {
      this.error = '';
      this.router.navigate(['/login']);
    } else {
      this.error = userOrError.message;
      setTimeout(() => {
        this.error = '';
      }, 8000);
    }
  }
}
