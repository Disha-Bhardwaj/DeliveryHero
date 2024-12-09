// Core modules imports
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Application imports
import { ScenarioComponent } from "./scenario.component";
import { AuthenticateRouteGuard } from "src/app/guards/authenticate-route.guard";

const routes: Routes = [
  {
    path: "scenario",
    component: ScenarioComponent,
    canActivate: [AuthenticateRouteGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScenarioRoutingModule {}
