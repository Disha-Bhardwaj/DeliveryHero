// // Core modules imports
// import { Component, OnInit, OnDestroy } from "@angular/core";
// import { Router } from "@angular/router";

// // Third party imports
// import { Subscription, throwError } from "rxjs";
// import { catchError, filter } from "rxjs/operators";
// import { NgDHHIAMService } from "ng-dhh-iam";
// import { CookieService } from "ngx-cookie-service";

// @Component({
//   selector: "app-root",
//   templateUrl: "./app.component.html",
//   styleUrls: ["./app.component.css"],
// })
// export class AppComponent implements OnInit, OnDestroy {
//   constructor(
//     private router: Router,
//     private cookie: CookieService,
//     private login: NgDHHIAMService
//   ) {}
//   shouldShow() {
//     return !(this.router.url === "/login");
//   }
//   private subscriptions = new Subscription();
//   public dhhIAMReqLoading = false;

//   ngOnInit() {
//     this.subscriptions.add(
//       this.login.dhhIAMReqLoading$.subscribe((value) => {
//         this.dhhIAMReqLoading = value;
//       })
//     );
//     this.subscriptions.add(
//       this.login
//         .localAuthSetup()
//         .pipe(
//           filter(
//             ({ gapi_token, dhh_iam_token, userProfile }) =>
//               !!(gapi_token && dhh_iam_token && userProfile)
//           ),
//           catchError((error) => {
//             return throwError(error);
//           })
//         )
//         .subscribe((value) => {
//           this.cookie.set("email", value.userProfile.given_name);
//         })
//     );
//   }
//   ngOnDestroy() {
//     this.subscriptions.unsubscribe();
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private spinner: NgxSpinnerService) {}
  shouldShow() {
    return !(this.router.url === '/login');
  }

}

