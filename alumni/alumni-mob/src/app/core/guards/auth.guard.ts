import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _storageService: StorageService,
    private _router: Router
  ) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute, state)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this._storageService.retrieve('auth')) {
      return true
    }
    // Enregistre l'URL demandée dans localStorage pour redirection après connexion
    this._storageService.store('redirectUrl', state.url);
    this._router.navigate(['/', 'login'],{queryParams:{desiredUrl:state.url}})
    return false
  }
}