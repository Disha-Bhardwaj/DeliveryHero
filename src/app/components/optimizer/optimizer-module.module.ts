// Core modules imports
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

// Third party imports
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { CookieService } from "ngx-cookie-service";

// Application imports
import { OptimizerRoutingModule } from "./optimizer.routing.module";
import { OptimizerComponent } from "./optimizer.component";
import { OptimizerService } from "src/app/services/optimizer.service";
import { Interceptor } from "src/app/services/interceptor.service";
import { ErrorInterceptor } from "src/app/services/errorInterceptor.service";

@NgModule({
  declarations: [OptimizerComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    OptimizerRoutingModule,
  ],
  providers: [
    OptimizerService,
    NgxSpinnerService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class OptimizerModuleModule {}
