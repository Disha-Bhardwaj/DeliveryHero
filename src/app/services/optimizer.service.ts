// Core modules imports
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// Third party imports
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class OptimizerService {
  // constructor
  constructor(private http: HttpClient) {}
  // API for post request filter select of Optimizer tool recommendation
  postRouteOptimizerTool(value) {
    return this.http.post(environment.URL + "optimizer1", value);
  }
  // API for post request to change responsive curve graph data
  postRouteResponsiveCurve(value) {
    return this.http.post(environment.URL + "responsecurve", value);
  }
  // API for post request initial data for Optimizer workbench
  initialRouteOptimizerWorkbench(value) {
    return this.http.post(environment.URL + "workbench", value);
  }
  // API for post request filter select of Optimizer workbench result
  postRouteworkbenchResult(value) {
    return this.http.post(environment.URL + "workbench_result", value);
  }
  // Dynamic route
  dynamicRoute() {
    return this.http.get(environment.URL + "filter?page_name=optimizer tool");
  }
  // API for fetching data for Scenario page
  fetchscenarioPageData(value) {
    return this.http.post(
      environment.URL + "user_allocation_scenario_planner",
      value
    );
  }
}
