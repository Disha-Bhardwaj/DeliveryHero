// Core modules imports
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Application imports
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  // routes to redirect to login page
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  // routes to load other modules on navigation
  {
    path: "businessSummary",
    loadChildren: () =>
      import(
        "./components/business-summary/business-summary-module.module"
      ).then((m) => m.BusinessSummaryModuleModule),
  },
  {
    path: "optimizer",
    loadChildren: () =>
      import("./components/optimizer/optimizer-module.module").then(
        (m) => m.OptimizerModuleModule
      ),
  },
  {
    path: "scenario",
    loadChildren: () =>
      import("./components/scenario/scenario-module.module").then(
        (m) => m.ScenarioModuleModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
