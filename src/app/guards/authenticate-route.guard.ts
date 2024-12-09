// Core modules imports
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";

// Third party imports
import { Observable } from "rxjs";

// Application imports
import { AuthServiceService } from "../services/auth-service.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticateRouteGuard implements CanActivate {
  constructor(public authService: AuthServiceService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // implementation of Guards and condition for checking authenticate
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/login");
      return false;
    }
    return true;
  }
}
