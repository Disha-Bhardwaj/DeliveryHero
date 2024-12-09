// core imports
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";

// Third party imports
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";

// Application imports
import { SpinnerServiceService } from "./spinner-service.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private spinner: SpinnerServiceService,
    private route: Router,
    private cookie: CookieService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          sessionStorage.clear();
          this.cookie.deleteAll();
          this.route.navigateByUrl("/login");
          this.spinner.sessionOut();
        } else if (err.status === 403) {
          sessionStorage.clear();
          this.cookie.deleteAll();
          this.route.navigateByUrl("/login");
          this.spinner.notAccessToTool();
        } else if (err.status === 404) {
          // sessionStorage.clear();
          // this.cookie.deleteAll();
          // this.route.navigateByUrl("/login");
          this.spinner.userNotFound();
        }  else if (err.status === 400) {
          sessionStorage.clear();
          this.cookie.deleteAll();
          this.route.navigateByUrl("/login");
          this.spinner.passNotCorrect();
        } else {
          this.spinner.error();
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
