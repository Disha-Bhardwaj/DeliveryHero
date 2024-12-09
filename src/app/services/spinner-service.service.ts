// Core modules imports
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

// Third party imports
import { NgxSpinnerService } from "ngx-spinner";
import { NgFlashMessageService } from "ng-flash-messages";
import { BehaviorSubject } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class SpinnerServiceService {
  constructor(
    private spinner: NgxSpinnerService,
    private ngFlashMessageService: NgFlashMessageService,
    private route: Router,
    private cookie: CookieService,
    private http: HttpClient
  ) {}
  // to pass data to scenario page
  private scenarioData = new BehaviorSubject([]);
  private scenarioFilters = new BehaviorSubject([]);
  newScenarioData = this.scenarioData.asObservable();
  newScenarioFilters = this.scenarioFilters.asObservable();

  // Pass data from optmizer to scenario page
  passDataToScenario(message: any, filterSelected : any) {
    this.scenarioData.next(message);
    this.scenarioFilters.next(filterSelected);
    this.route.navigateByUrl("/scenario/scenario");
  }
  // Activate spinner (show spinner)
  activateSpinner() {
    this.spinner.show();
  }
  // Deactivate spinner (hide spinner)
  deactivateSpinner() {
    this.spinner.hide();
  }
  error() {
    this.ngFlashMessageService.showFlashMessage({
      messages: ["Error! Backend server not connected"],
      dismissible: false,
      timeout: 3000,
      type: "danger",
    });
  }
  sessionOut() {
    sessionStorage.clear();
    this.cookie.deleteAll();
    this.route.navigateByUrl("/login");
    this.ngFlashMessageService.showFlashMessage({
      messages: ["Authentication Failed!"],
      dismissible: false,
      timeout: 3000,
      type: "danger",
    });
    window.location.reload();
  }
  notAccessToTool() {
    this.ngFlashMessageService.showFlashMessage({
      messages: ["It seems you don't have access to this tool."],
      dismissible: false,
      timeout: 3000,
      type: "danger",
    });
  }
  userNotFound() {
    this.ngFlashMessageService.showFlashMessage({
      messages: ["User not found"],
      dismissible: false,
      timeout: 3000,
      type: "danger",
    });
  }
  passNotCorrect() {
    this.ngFlashMessageService.showFlashMessage({
      messages: ["Incorrect Password"],
      dismissible: false,
      timeout: 3000,
      type: "danger",
    });
  }
  public async downloadResource(id: string): Promise<Blob> {
    const file = await this.http
      .get<Blob>(id, { responseType: "blob" as "json" })
      .toPromise();
    return file;
  }
}
