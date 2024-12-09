// Core modules imports
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

// Third party imports
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { CookieService } from "ngx-cookie-service";

// Application imports
import { BusinessSummaryRoutingModule } from "./business-summary.routing.module";
import { BusinessSummaryComponent } from "./business-summary.component";
import { Interceptor } from "src/app/services/interceptor.service";
import { BusinessSummaryService } from "src/app/services/businessSummary.service";
import { ThousandSuffixesPipe } from "./formatterPipe";
import { ErrorInterceptor } from "src/app/services/errorInterceptor.service";

@NgModule({
  declarations: [BusinessSummaryComponent, ThousandSuffixesPipe],
  imports: [
    CommonModule,
    BusinessSummaryRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    BusinessSummaryService,
    NgxSpinnerService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class BusinessSummaryModuleModule {}
