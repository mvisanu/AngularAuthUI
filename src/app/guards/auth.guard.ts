import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate():boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      console.log("Error: user need to login");
      this.router.navigate(['/login']);
      return false;
    }
  }

}
