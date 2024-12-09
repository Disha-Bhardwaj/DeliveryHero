// Core module import
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
} from "@angular/common/http";

// Third party imports
import { Observable } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      }),
    };
    const customReq = request.clone(requestOptions);
    return next.handle(customReq);
  }
}
