import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ISystemUser } from 'src/app/shared/interfaces/i-system-user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user: ISystemUser;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
