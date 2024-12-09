// // Core modules imports
// import { Component, OnInit } from "@angular/core";
// import { ActivatedRoute, Router } from "@angular/router";
// import { ViewChild, ElementRef } from "@angular/core";
// import { Title } from "@angular/platform-browser";

// // Third party imports
// import { combineLatest, Subject, Subscription } from "rxjs";
// import { NgDHHIAMService } from "ng-dhh-iam";
// import { filter, map, takeUntil, tap } from "rxjs/operators";

// @Component({
//   selector: "app-login",
//   templateUrl: "./login.component.html",
//   styleUrls: ["./login.component.css"],
// })
// export class LoginComponent implements OnInit {
//   private lock$ = new Subject<void>();
//   @ViewChild("loginRef", { static: true }) loginElement: ElementRef;
//   // constructor
//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     public loginService: NgDHHIAMService,
//     private title: Title
//   ) {}

//   private subscriptions = new Subscription();
//   public loggedIn = false;
//   //  initial data on page load function call
//   onClickGmail(){
//     this.title.setTitle("Login")
//     this.subscriptions.add(
//       combineLatest(this.loginService.token$, this.loginService.dhhIAMLoggedIn$)
//         .pipe(
//           tap(([, dhhIAMLoggedIn]) => {
//             this.loggedIn = dhhIAMLoggedIn;
//           }),
//           map(([token, dhhIAMLoggedIn]) => ({ token, dhhIAMLoggedIn })),
//           filter(({ token, dhhIAMLoggedIn }) => token && !dhhIAMLoggedIn),
//           takeUntil(this.lock$)
//         )
//         .subscribe(() => {
//           this.login();
//         })
//     );

//     this.subscriptions.add(
//       this.route.queryParamMap
//         .pipe(
//           map((queryParams) => queryParams.get("next")),
//           filter<string>(Boolean),
//           takeUntil(this.lock$)
//         )
//         .subscribe((nextRoute) => {
//           this.login(nextRoute);
//         })
//     );
//         this.login();
    
//   }
//   ngOnInit() {}

//   login(nextRoute = "") {
//     this.lock$.next();
//     this.lock$.complete();

//     this.subscriptions.add(
//       this.loginService.login().subscribe({
//         next: () => {
//           this.router.navigateByUrl(nextRoute || "/businessSummary/business");
//         },
//         error: (err) => {
//           const gapiPopupClose =
//             err.error && err.error === "popup_closed_by_user";
//           if (!gapiPopupClose) {
//           }
//         },
//       })
//     );
//   }
//   ngOnDestroy() {
//     this.subscriptions.unsubscribe();
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { finalize } from 'rxjs/operators';
import { SpinnerServiceService } from 'src/app/services/spinner-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // login form creation
  loginForm: FormGroup;
  // to store the data
  userCheck: any = [];
  // check input values are null or not
  submitNull = false;
  submitWrongPass = false;
  submitWrongUser = false;
  show = false;
  // constructor
  constructor(
    private spinner: SpinnerServiceService,
    private fb: FormBuilder,
    private service: LoginService,
    private router: Router,
    private cookie: CookieService,
    private ngFlashMessageService: NgFlashMessageService
  ) { }
  //  reactive form value get
  get user_id() {
    return this.loginForm.get('user_id');
  }
  get password() {
    return this.loginForm.get('password');
  }
  //  initial data on page load function call
  ngOnInit() {
    this.loginForm = this.fb.group({
      user_id: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  // on submit button click credential send to backend
  onSubmit() {
    this.spinner.activateSpinner();
    this.service.apiCalling(this.loginForm.value)
      .pipe(finalize(() => this.spinner.deactivateSpinner())).subscribe((data: any) => {
        // sessionStorage.setItem('authToken',data.access_token)
        // this.router.navigateByUrl('/businessSummary/business');
        if (data.success) {
            this.loginForm.reset();
            this.ngFlashMessageService.showFlashMessage({
              messages: ['data.message'],
              dismissible: false,
              timeout: 3000,
              type: 'danger'
            })
        } else {
          this.cookie.set('email',this.loginForm.value.user_id)
          sessionStorage.setItem('authToken',data.access_token)
        this.router.navigateByUrl('/businessSummary/business');
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.ngFlashMessageService.showFlashMessage({
              messages: ['Password Incorrect'],
              dismissible: false,
              timeout: 3000,
              type: 'danger'
            });
            this.loginForm.reset();
          } else if (err.status === 404) {
            this.loginForm.reset();
            this.ngFlashMessageService.showFlashMessage({
              messages: ['User Not Found'],
              dismissible: false,
              timeout: 3000,
              type: 'danger'
            });
          }
        }
      });
  }

  // View Password icon function
  viewPassword() {
    this.show = !this.show;
    const passwordInput = document.getElementById('password-field') as HTMLElement;
    const passStatus = document.getElementById('pass-status') as HTMLElement;
    if (this.show === true) {
      passStatus.className = 'fa fa-eye-slash';
    } else {
      passStatus.className = 'fa fa-eye';
    }
  }
}
