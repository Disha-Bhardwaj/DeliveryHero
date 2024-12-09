// Core modules imports
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// Third party imports
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-top-nav-bar",
  templateUrl: "./top-nav-bar.component.html",
  styleUrls: ["./top-nav-bar.component.css"],
})
export class TopNavBarComponent implements OnInit {
  // username on navBar
  userName = "";
  constructor(private route: Router, private cookie: CookieService) {}

  ngOnInit() {
    // get username
    this.userName = this.cookie.get("email");
  }
  // logout function
  logout() {
    sessionStorage.clear();
    this.cookie.deleteAll();
    this.route.navigateByUrl("/login");
    window.location.reload();
  }
}
