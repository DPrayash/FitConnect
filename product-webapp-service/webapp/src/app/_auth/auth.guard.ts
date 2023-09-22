import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userAuthService : UserAuthService, private router : Router,
    private authenticationService : AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.userAuthService.getToken() != null) {
        const role  = route.data["roles"] as Array<string>;

        if(role) {
          const match = this.authenticationService.roleMatch(role);

          if(match)
          {
            return true;
          }else {
            this.router.navigate(['/forbidden']);
            return false;
          }

          
        }

      }

      this.router.navigate(['/login']);
      return false;
  }
  
}
