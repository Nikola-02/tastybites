import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ISystemUser } from 'src/app/shared/interfaces/i-system-user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  user: ISystemUser | null;
  userSub: Subscription;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }

  logout() {
    this.authService.logout();

    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
