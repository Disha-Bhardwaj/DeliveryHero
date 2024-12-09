// Core modules imports
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// Application imports
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class BusinessSummaryService {
  // constructor
  constructor(private http: HttpClient) {}
  // API for post request filter select
  postFilter(value) {
    return this.http.post(environment.URL + "summary", value);
  }
  // API calling for all the other functionality
  combineRoute(value) {
    return this.http.post(environment.URL + "summary_chart", value);
  }
  // Dynamic route
  dynamicRoute() {
    return this.http.get(environment.URL + "filter?page_name=business summary");
  }
}
