import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faUser, faCapsules, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
// import { NavigationRoutes } from '../../../shared/enums';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    CommonModule,
    // FontAwesomeModule,
    RippleModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    OverlayPanelModule
  ],
  templateUrl: './menu-bar.component.html',
  // styleUrl: './menu-bar.component.css',
})
export class MenuBarComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }





}
