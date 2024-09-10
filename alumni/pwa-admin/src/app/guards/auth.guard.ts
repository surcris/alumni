import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // is user logged in?
  const authService = inject(AuthService);
  const isLoggedIn = authService.loggedIn;
  if(!isLoggedIn) {
    // redirect to auth
    const router = inject(Router);
    router.navigateByUrl('/auth');
    // TODO: Use something to redirect user on current page after login
  }
  return isLoggedIn;
};
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}