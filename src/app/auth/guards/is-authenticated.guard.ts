import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';


export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  // const url = state.url;
  // localStorage.setItem('url', url);

  // Hay que regresar true si el usuario está autenticado, o false si no lo está

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.checkAuthentication() === true) return true;

  //Si todavía no tenemos el conocimiento necesario para mandar al login, retornamos false
  // if (authService.authStatus() === AuthStatus.checking) return false;

  // Dice Fernando: opcional para guardar en el storage dónde quiere navegar el usuario
  // const url = state.url;
  // localStorage.setItem('url', url)

  router.navigateByUrl('/login')

  return false;
};
