// Core modules imports
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// Application imports
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ScenarioService {
  // constructor
  constructor(private http: HttpClient) {}
  // API for post request filter select
  postRoute(value) {
    return this.http.post(environment.URL + "scenarioplanner", value);
  }
  // API for post request for specific detail change
  postRouteDetails(value) {
    return this.http.post(environment.URL + "scenarioplannerdetail", value);
  }
  // API for post for download results
  downloadResult(value) {
    return this.http.post(environment.URL + "scenarioplannerdownload", value);
  }
  // Dynamic route
  dynamicRoute() {
    return this.http.get(environment.URL + "filter?page_name=scenario planner");
  }
}
