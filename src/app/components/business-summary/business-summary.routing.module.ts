// Core modules imports
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Application imports
import { BusinessSummaryComponent } from "./business-summary.component";
import { AuthenticateRouteGuard } from "src/app/guards/authenticate-route.guard";

const routes: Routes = [
  {
    path: "business",
    component: BusinessSummaryComponent,
    canActivate: [AuthenticateRouteGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessSummaryRoutingModule {}
