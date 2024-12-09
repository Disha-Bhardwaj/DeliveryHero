import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private route: Router, private cookie: CookieService) { }
  // API for post the login credentials and validate
  apiCalling(value) {
    return this.http.post(environment.URL + 'login', value);
  }
  logout() {
    return this.http.post(environment.URL + 'token/remove', {});
  }
}
