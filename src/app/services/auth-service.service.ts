// Core modules imports
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  // constructor
  constructor() {}
  // to authenticate user and authorize the user to navigate to other route
  public isAuthenticated(): boolean {
    return (
      sessionStorage.getItem("authToken") != null ||
      sessionStorage.getItem("authToken") === ""
    );
  }
}
