import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ISystemUser } from 'src/app/shared/interfaces/i-system-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  user: ISystemUser | null;
  userSub: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
