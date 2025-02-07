import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('authToken');

    if (!isAuthenticated) {
      this.router.navigate(['/auth']);
      return false;
    }

    return true;
  }

}
