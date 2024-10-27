import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faUser, faCapsules, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
// import { NavigationRoutes } from '../../../shared/enums';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    CommonModule,
    // FontAwesomeModule,
    RippleModule,
    ButtonModule
  ],
  templateUrl: './menu-bar.component.html',
  // styleUrl: './menu-bar.component.css',
})
export class MenuBarComponent {

  // faUser = faUser;
  // faCapsules = faCapsules;
  // faTrash = faTrash;

  private router = inject(Router);

  // navigateToPacientes(): void {
  //   console.log('clickeado');

  //   this.router.navigateByUrl(`/${NavigationRoutes.PACIENTES}`)
  // }


}
