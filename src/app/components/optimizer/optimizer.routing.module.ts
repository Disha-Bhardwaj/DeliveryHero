// Core modules imports
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Application imports
import { OptimizerComponent } from "../optimizer/optimizer.component";
import { AuthenticateRouteGuard } from "src/app/guards/authenticate-route.guard";

const routes: Routes = [
  {
    path: "optimizer",
    component: OptimizerComponent,
    canActivate: [AuthenticateRouteGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptimizerRoutingModule {}
