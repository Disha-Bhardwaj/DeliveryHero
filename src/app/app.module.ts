// Core modules imports
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Third party imports
import { CookieService } from "ngx-cookie-service";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NgFlashMessagesModule } from "ng-flash-messages";

// Application imports
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LeftPanelComponent } from "./components/left-panel/left-panel.component";
import { TopNavBarComponent } from "./components/top-nav-bar/top-nav-bar.component";
import { LoginComponent } from "./components/login/login.component";
import { Interceptor } from "./services/interceptor.service";
import { ErrorInterceptor } from "./services/errorInterceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LeftPanelComponent,
    TopNavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgFlashMessagesModule.forRoot(),
  ],

  providers: [
    NgxSpinnerService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
