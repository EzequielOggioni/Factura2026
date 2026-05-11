import { CanActivateFn, CanDeactivateFn } from '@angular/router';

export const usuariologueadoGuard: CanActivateFn = (route, state) => {
  
  
  return localStorage.getItem('userType') == 'admin';
};
