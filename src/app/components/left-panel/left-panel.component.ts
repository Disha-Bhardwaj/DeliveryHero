// Core modules imports
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// Third party imports
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-left-panel",
  templateUrl: "./left-panel.component.html",
  styleUrls: ["./left-panel.component.css"],
})
export class LeftPanelComponent implements OnInit {
  constructor(private route: Router, private cookie: CookieService) {}

  ngOnInit() {}
  // logout
  logout() {
    sessionStorage.clear();
    this.cookie.deleteAll();
    this.route.navigateByUrl("/login");
    window.location.reload();
  }
}
