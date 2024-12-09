// Core modules imports
import { Component, OnDestroy, OnInit,ElementRef, ViewChild, } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

// Third party imports
import { Subscription } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { finalize } from "rxjs/operators";

// Application imports
import { ScenarioService } from "src/app/services/scenario.service";
import { SpinnerServiceService } from "src/app/services/spinner-service.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-scenario",
  templateUrl: "./scenario.component.html",
  styleUrls: ["./scenario.component.css"],
})
export class ScenarioComponent implements OnInit {
  @ViewChild("downloadZipLink", { static: false })
  private downloadZipLink: ElementRef;
  // initial data store
  scenarioList: any | undefined | null;
  scenarioDetailsList: any | undefined | null = [];
  initialScenarioData: any | undefined | null = [];
  // form creation
  scenarioForm: FormGroup;
  // specific range change value json
  specificRangeTypeChange: any | undefined | null = [];
  // for dynamic months based on quarter
  q1 = false;
  q2 = false;
  q3 = true;
  q4 = false;
  eventFired = false;
  defaultAllowableChange = 0;
  // store the value of baseSpend and newspend
  totalBase = [];
  totalNew = [];
  //  to find the large baseSpend and newspend
  largerBase = 0;
  largerNew = 0;
  // username on navBar
  userName = "";
  scenarioPostReq: Subscription;
  // store the download path
  forPath: any | undefined | null = [];
  countryList: any = [];
  yearList: any = [];
  private downloadUrl: string;
  quarterList: any = [];
  filtersList: any = [];
  selectedCountry = "";
  categoryList: any = [];
  KPIlist: any = [];
  regionlist: any=[] 
  cityList: any = [];
  kpiValueSelected = ''
  constructor(
    private service: ScenarioService,
    private formBuilder: FormBuilder,
    private spinner: SpinnerServiceService,
    private cookie: CookieService
  ) {}
// Select KPI
selectKPI(value){
  this.kpiValueSelected = value
}
  // dynamic filters
  filtersCountry(value, filter) {
    if (filter === "country") {
      this.selectedCountry = value;
      this.cityList = [];
      this.quarterList = [];
      this.yearList = [];
       // country
       this.filtersList.forEach((element) => {
        if (element.display_name === value) {
          this.cityList.push(element.city);
        }
      });
      this.cityList = [...new Set(this.cityList)];
      // year
      this.filtersList.forEach((element) => {
        if (element.display_name === value && element.city === this.cityList[0]) {
          this.yearList.push(element.year);
        }
      });
      this.yearList = [...new Set(this.yearList)];
      // quarter
      this.filtersList.forEach((element) => {
        if (
          element.display_name === value && element.city === this.cityList[0] &&
          element.year === this.yearList[0]
        ) {
          this.quarterList.push(element.quarter);
        }
      });
      this.quarterList = [...new Set(this.quarterList)];
      this.onOptionsSelected(this.quarterList[0]);
      this.scenarioForm.patchValue({
        city: this.cityList[0],
        year: this.yearList[0],
        quarter: this.quarterList[0],
      });
    } else if (filter === "city") {
      this.quarterList = [];
      this.yearList = [];
      this.filtersList.forEach((element) => {
        if (element.city === value) {
          this.yearList.push(element.year);
        }
      });
      this.yearList = [...new Set(this.yearList)];
      this.filtersList.forEach((element) => {
        if (
          element.city === value &&
          element.year === this.yearList[0]
        ) {
          this.quarterList.push(element.quarter);
        }
      });
      this.quarterList = [...new Set(this.quarterList)];
      this.onOptionsSelected(this.quarterList[0]);
      this.scenarioForm.patchValue({
        year: this.yearList[0],
        quarter: this.quarterList[0],
      });
    } else {
      const valueNew = parseInt(value);
      this.quarterList = [];
      this.filtersList.forEach((element) => {
        if (
          element.display_name === this.selectedCountry &&
          element.year === valueNew
        ) {
          this.quarterList.push(element.quarter);
        }
      });
      this.quarterList = [...new Set(this.quarterList)];
      this.onOptionsSelected(this.quarterList[0]);
      this.scenarioForm.patchValue({
        quarter: this.quarterList[0],
      });
    }
  }
  refresh() {
    const scenariosFormSubmit = {
      channel: "",
      quarter: this.scenarioForm.value.quarter,
      category: this.scenarioForm.value.category,
      month: this.scenarioForm.value.month,
      country: this.scenarioForm.value.country,
      year: this.scenarioForm.value.year,
      scenarioDetailsTable: [],
      specificTypeChange: [],
    };
    this.cookie.set("country", scenariosFormSubmit.country);
    this.spinner.activateSpinner();
    this.scenarioPostReq = this.service
      .postRoute(scenariosFormSubmit)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.specificRangeTypeChange = []
          this.initialScenarioData = data;
          this.scenarioList = this.initialScenarioData.data.scenarios;
          this.scenarioDetailsList = this.initialScenarioData.data.scenario_details;
          this.eventFired = false;
          this.findLargeBase_NewSpend();
          if (this.initialScenarioData.data.outOfLimits === "True") {
            alert(
              "The confidence level in projections will be lower when new spend is more than 50% or less than -50% of base spend"
            );
          }
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // on page load data loading and form creation
  ngOnInit(): void {
    this.userName = this.cookie.get("email");
    this.scenarioForm = this.formBuilder.group({
      quarter: ["q3"],
      city:[""],
      category: [''],
      month: ["all"],
      country: [""],
      year: ["2020"],
    });
    this.selectedCountry = this.cookie.get("country");
    this.service.dynamicRoute().subscribe((data: any) => {
      this.countryList = data.data.countries;
      this.categoryList = data.data.categories;
      // this.regionlist = data.data.regions
      this.KPIlist = data.data.kpi
      this.kpiValueSelected = this.KPIlist[0]
      if (!this.selectedCountry || this.selectedCountry === "undefined") {
        this.selectedCountry = this.countryList[0];
      }
      this.filtersList = data.data.time_period;
     // country filter
     this.filtersList.forEach((element) => {
      if (element.display_name === this.selectedCountry) {
        this.cityList.push(element.city);
      }
    });
    this.cityList = [...new Set(this.cityList)];

    // year filter
    this.filtersList.forEach((element) => {
      if (element.display_name === this.selectedCountry && element.city === this.cityList[0]) {
        this.yearList.push(element.year);
      }
    });
    this.yearList = [...new Set(this.yearList)];

    // quarter filter
    this.filtersList.forEach((element) => {
      if (
        element.display_name === this.selectedCountry && element.city === this.cityList[0] && element.year === this.yearList[0]
      ) {
        this.quarterList.push(element.quarter);
      }
    });
      this.quarterList = [...new Set(this.quarterList)];
      this.onOptionsSelected(this.quarterList[0]);
      this.scenarioForm.patchValue({
        country: this.selectedCountry,
        city:  this.cityList[0],
        year: this.yearList[0],
        quarter: this.quarterList[this.quarterList.length - 1],
        category: this.categoryList[0]
      });
      if (sessionStorage.getItem("OptiScenarioCheck") === "true") {
        sessionStorage.setItem("OptiScenarioCheck", "false");
        this.dataFromOptimizationPage();
      } else {
        sessionStorage.setItem("OptiScenarioCheck", "false");
        this.submitScenarioForm();
      }
    });
  }
  // data from optimization
  dataFromOptimizationPage() {
    this.spinner.newScenarioFilters.subscribe((data: any)=>{
      this.onOptionsSelected(data.quarter)
      this.scenarioForm.patchValue({
        quarter: data.quarter,
        month: data.month,
        year: data.year,
      })
    })
    this.scenarioPostReq = this.spinner.newScenarioData.subscribe((data) => {
      this.initialScenarioData = data;
      this.scenarioList = this.initialScenarioData.data.scenarios;
      this.scenarioDetailsList = this.initialScenarioData.data.scenario_details;
      this.eventFired = false;
      this.findLargeBase_NewSpend();
      if (this.initialScenarioData.data.outOfLimits === "True") {
        alert(
          "The confidence level in projections will be lower when new spend is more than 50% or less than -50% of base spend"
        );
      }
    });
  }
  // dynamic month based on quarter select
  onOptionsSelected(value) {
    this.q1 = value === "q1";
    this.q2 = value === "q2";
    this.q3 = value === "q3";
    this.q4 = value === "q4";
    this.scenarioForm.patchValue({
      month: "all",
    });
  }
  target() {
    this.eventFired = false;
  }
  // to find large base and new spend
  findLargeBase_NewSpend() {
    this.totalBase = [];
    this.scenarioDetailsList.forEach((element) => {
      this.totalBase.push(element.totalBaseSpendNum);
    });
    this.largerBase = Math.max(...this.totalBase);
  }
  // Scenario Type Channel change
  scenarioTypeRangeChange(range, totalbase, type) {
    const rangeData = {
      customChange: range,
      basespend: totalbase,
      type: type,
    };
    let foundAtIndex;
    if (this.specificRangeTypeChange.length !== 0) {
      let found = this.specificRangeTypeChange.some(
        (el) => el.type === rangeData.type
      );
      if (!found) {
        this.specificRangeTypeChange.push(rangeData);
      } else {
        foundAtIndex = this.specificRangeTypeChange.findIndex(
          (x) => x.type === rangeData.type
        );
        this.specificRangeTypeChange.splice(foundAtIndex, 1);
        this.specificRangeTypeChange.push(rangeData);
      }
    } else {
      this.specificRangeTypeChange.push(rangeData);
    }
  }
  // submit filters value sending value to backend
  submitScenarioForm() {
    const scenariosFormSubmit = {
      channel: "",
      quarter: this.scenarioForm.value.quarter,
      category: this.scenarioForm.value.category,
      month: this.scenarioForm.value.month,
      country: this.scenarioForm.value.country,
      year: this.scenarioForm.value.year,
      scenarioDetailsTable: this.scenarioDetailsList,
      specificTypeChange: this.specificRangeTypeChange,
    };
    this.cookie.set("country", scenariosFormSubmit.country);
    this.spinner.activateSpinner();
    this.scenarioPostReq = this.service
      .postRoute(scenariosFormSubmit)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.initialScenarioData = data;
          this.scenarioList = this.initialScenarioData.data.scenarios;
          this.scenarioDetailsList = this.initialScenarioData.data.scenario_details;
          this.eventFired = false;
          this.findLargeBase_NewSpend();
          if (this.initialScenarioData.data.outOfLimits === "True") {
            alert(
              "The confidence level in projections will be lower when new spend is more than 50% or less than -50% of base spend"
            );
          }
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // specific change range
  scenarioSpecificRangeChange(
    unit,
    rangeValue,
    scenarioTBS,
    scenarioTNS,
    channelText,
    i,
    channelB,
    scenarioType
  ) {
    this.alertPromptChangeSpend(rangeValue, channelB[i].valueNum ,unit)
    const specificRangeChange = {
      quarter: this.scenarioForm.value.quarter,
      category: this.scenarioForm.value.category,
      month: this.scenarioForm.value.month,
      country: this.scenarioForm.value.country,
      year: this.scenarioForm.value.year,
      totalBaseSpend: scenarioTBS,
      totalNewSpend: scenarioTNS,
      channel: channelText[i],
      channelBaseSpend: channelB[i],
      channelChangedSpend: rangeValue,
      scenarioDetailsTable: this.scenarioDetailsList,
      scenarioListData: this.scenarioList,
      index: i,
      type: scenarioType,
    };
    if (!specificRangeChange.channel) {
      specificRangeChange.channel = "";
      specificRangeChange.index = -1;
    }
    if (!specificRangeChange.channelBaseSpend) {
      specificRangeChange.channelBaseSpend = "";
      specificRangeChange.index = -1;
    }
    if (specificRangeChange.index === undefined) {
      specificRangeChange.index = -1;
    }
    this.spinner.activateSpinner();
    this.scenarioPostReq = this.service
      .postRouteDetails(specificRangeChange)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.initialScenarioData = data;
          const [firstData = ([] = [])] =
            this.initialScenarioData.data.scenarioupdated || [];
          this.scenarioList = firstData.scenarioListData;
          this.scenarioDetailsList = firstData.scenarioDetailsTable;
          this.findLargeBase_NewSpend();
          this.eventFired = true;
          if (firstData.outOfLimits === "True") {
            alert(
              "The confidence level in projections will be lower when new spend is more than 50% or less than -50% of base spend"
            );
          }
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
   // download data scenario planner details
   public async downloadZip(): Promise<void> {
    const blob = await this.spinner.downloadResource(this.downloadUrl);
    const url = window.URL.createObjectURL(blob);
    const link = this.downloadZipLink.nativeElement;
    link.href = url;
    link.download = this.forPath.split("/").pop();
    link.click();
    window.URL.revokeObjectURL(url);
  }
  downloadDetails() {
    this.spinner.activateSpinner();
    const downloadData = {
      scenarioDetailsTable: this.scenarioDetailsList,
    };
    this.service
      .downloadResult(downloadData)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.forPath = data.data;
          this.downloadUrl =
            environment.URL.slice(-environment.URL.length, -1) + this.forPath;
          this.downloadZip();
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // alert Prompt
  alertPromptChangeSpend(newSpend, baseSpend, unit) {
    if (unit === "M") {
      newSpend = newSpend * 1000000;
    } else if (unit === "K") {
      newSpend = newSpend * 1000;
    }
    const changeSpend = ((newSpend - baseSpend) / baseSpend) * 100;
    if (changeSpend > 50 || changeSpend < -50) {
      alert(
        "The confidence level in projections will be lower when new spend is more than 50% or less than -50% of base spend"
      );
    }
  }
}
