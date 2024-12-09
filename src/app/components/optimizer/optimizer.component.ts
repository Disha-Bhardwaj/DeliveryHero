// Core modules imports
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

// Third party imports
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";

// Application imports
import { environment } from "src/environments/environment";
import { OptimizerService } from "src/app/services/optimizer.service";
import { SpinnerServiceService } from "src/app/services/spinner-service.service";
declare var $: any;
enum dataNum {
  zero,
  one,
  two,
}
@Component({
  selector: "app-optimizer",
  templateUrl: "./optimizer.component.html",
  styleUrls: ["./optimizer.component.css"],
})
export class OptimizerComponent implements OnInit {
  @ViewChild("clickAquisitionTab", { static: false })
  clickAquisitionTab: ElementRef;
  @ViewChild("clickOrderTab", { static: false }) clickOrderTab: ElementRef;
  @ViewChild("clickBucketTab", { static: false }) clickBucketTab: ElementRef;
  @ViewChild("downloadOptimizer", { static: false }) private downloadOptimizer: ElementRef;
  // initial data store
  optimizerList: any | undefined | null;
  countryWiseResult: any | undefined | null = [];
  optimizerWorkBenchResult: any | undefined | null = [];
  initialValueToolRecom: any | undefined | null = [];
  optimizerWorkbenchData: any | undefined | null = [];
  optiWorkbenchResultData: any | undefined | null = [];
  // filter form creation
  optimizerToolForm: FormGroup;
  optiWorkBenchForm: FormGroup;
  // for dynamic months based on quarter
  q1 = false;
  q2 = false;
  q3 = true;
  q4 = false;
  // variable for order or aquisition for responsive curve graph
  orderAqui = false;
  // base aquisition and base order for optimizer tool recommendation page
  baseAquiToolRecom = "";
  baseOrderToolRecom = "";
  // base aquisition, base order,  planned spend for optimizer work bench page
  baseAquiWorkBench = "";
  baseOrderWorkBench = "";
  plannedWorkBenchResult;
  optiToolRecom: any | undefined | null = [];
  // graph data and graph column
  responsiveCurveData: any | undefined | null = [];
  // store the value of baseSpend and newspend
  totalBase: any | undefined | null = [];
  totalNew: any | undefined | null = [];
  //  to find the large baseSpend and newspend
  largerBase = 0;
  largerNew = 0;
  // store the download path
  forPath: any | undefined | null = [];
  // username on navBar
  userName = "";
  // plannedText according to optimization for select
  plannedText = "Enter Planned Spend";
  resultPlannedText = "Planned Spend";
  thousand = "(in Millions)";
  boundaryCond = "1";
  // graph variable for performance market, top of mind, incentive
  performanceMarketGraph: any | undefined | null = [];
  topOfMindGraph: any | undefined | null = [];
  incentiveGraph: any | undefined | null = [];
  updatedTableValues: any | undefined | null = [];
  optiWorkBenchPostReq: Subscription;
  plannedWorkBench;
  plannedToolRecom = 0;
  workBenchLowerLimit;
  workBenchUperLimit;
  bucCHanTab = "bucket";
  oATab = "Acquisition";
  topChannel = [];
  pMktChannel = [];
  private downloadUrl: string;
  incenChannel = [];
  // dynamic Country
  countryList: any = [];
  yearList: any = [];
  quarterList: any = [];
  filtersList: any = [];
  metricOfInterestList: any = [];
  selectedCountry = "";
  categoryList: any = [];
  KPIlist: any = [];
  regionlist: any = [];
  cityList: any = [];
  kpiValueSelected = "";
  alertMessage = "";
  showChannelResult = true;
  upperLimitMaxRange;
  lowerLimitMinRange;
  topOfMindSelectChannel = "";
  performSelectChannel = "";
  incentiveSelectChannel = "";
  plannedSpendInfo =
    "Input field for providing overall marketing budget and assess optimization scenarios ( By default it uses planned spend from Lucanet)";
  checkGraphValue = false;
  graphValuelength = 0;
  responsiveGraphName = '';
  selectedMaximization  = "";
  constructor(
    private service: OptimizerService,
    private spinner: SpinnerServiceService,
    private formBuilder: FormBuilder,
    private cookie: CookieService
  ) {}
  // Tool recommendation enter planned value
  plannedSpendToolRecom(event) {
    this.plannedToolRecom = event;
  }
  // workbench enter planned value
  plannedSpendworkbench(event) {
    this.plannedWorkBench = event;
  }
  // workbench default lowerlimit
  workBenchLowerLimitFun(event) {
    if (event > 0 || event < this.lowerLimitMinRange) {
      alert(this.alertMessage);
      this.workBenchLowerLimit = event;
    } else {
      this.workBenchLowerLimit = event;
    }
  }
  // workbench default  Upperlimit
  workBenchUperLimitFun(event) {
    if (event < 0 || event > this.upperLimitMaxRange) {
      alert(this.alertMessage);
      this.workBenchUperLimit = event;
    } else {
      this.workBenchUperLimit = event;
    }
  }
  // boundary conditions
  boundaryConditionFun(event) {
    if (event.currentTarget.checked) {
      this.boundaryCond = "1";
    } else {
      this.boundaryCond = "0";
    }
  }
  // optimization change
  optimizationChange(value) {
    this.selectedMaximization = value
    if (value === "Target Orders") {
      this.plannedText = value;
      this.resultPlannedText = value;
      this.plannedSpendInfo =
        "Input field for providing target orders and assess most optimal scenarios. The optimization result is shown in 3rd row of the table.";
      this.thousand = "(in Millions)";
    } else if (value === "Target Acquisitions") {
      this.plannedText = value;
      this.resultPlannedText = value;
      this.thousand = "(in Thousand)";
      this.plannedSpendInfo =
        "Input field for providing target acquisitions and assess most optimal scenarios. The optimization result is shown in 3rd row of the table.";
    } else {
      this.plannedText = "Enter Planned Spend";
      this.resultPlannedText = "Planned Spend";
      this.thousand = "(in Millions)";
      this.plannedSpendInfo =
        "Input field for providing overall marketing budget and assess optimization scenarios ( By default it uses planned spend from Lucanet)";
    }
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
        if (
          element.display_name === value &&
          element.city === this.cityList[0]
        ) {
          this.yearList.push(element.year);
        }
      });
      this.yearList = [...new Set(this.yearList)];
      // quarter
      this.filtersList.forEach((element) => {
        if (
          element.display_name === value &&
          element.city === this.cityList[0] &&
          element.year === this.yearList[0]
        ) {
          this.quarterList.push(element.quarter);
        }
      });
      this.quarterList = [...new Set(this.quarterList)];
      this.onOptionsSelected(this.quarterList[0]);
      this.optimizerToolForm.patchValue({
        city: this.cityList[0],
        year: this.yearList[0],
        quarter: this.quarterList[0],
      });
    } else if (filter === "city") {
      this.quarterList = [];
      this.yearList = [];
      // this.countryList = [...new Set(this.countryList)];
      // year
      this.filtersList.forEach((element) => {
        if (element.city === value) {
          this.yearList.push(element.year);
        }
      });
      this.yearList = [...new Set(this.yearList)];
      // quarter
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
      this.optimizerToolForm.patchValue({
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
      this.optimizerToolForm.patchValue({
        quarter: this.quarterList[0],
      });
    }
  }
  // on page load function call and form declaration
  ngOnInit(): void {
    this.optimizerToolForm = this.formBuilder.group({
      quarter: ["q3"],
      country: [""],
      city: [""],
      category: [""],
      year: ["2020"],
      maximization: [],
      month: ["all"],
    });
    this.optiWorkBenchForm = this.formBuilder.group({
      quarter: [{ value: "", disabled: true }],
      country: [{ value: "", disabled: true }],
      city: [{ value: "", disabled: true }],
      category: [{ value: "", disabled: true }],
      year: [{ value: "", disabled: true }],
      maximization: [{ value: "", disabled: true }],
      month: [{ value: "", disabled: true }],
    });
    this.selectedCountry = this.cookie.get("country");
    this.service.dynamicRoute().subscribe((data: any) => {
      this.countryList = data.data.countries;
      this.categoryList = data.data.categories;
      this.KPIlist = data.data.kpi;
      this.kpiValueSelected = this.KPIlist[0];
      if (!this.selectedCountry || this.selectedCountry === "undefined") {
        this.selectedCountry = this.countryList[0];
      }
      this.filtersList = data.data.time_period;
      this.metricOfInterestList = data.data.metric;
      // country filter
      this.filtersList.forEach((element) => {
        if (element.display_name === this.selectedCountry) {
          this.cityList.push(element.city);
        }
      });
      this.cityList = [...new Set(this.cityList)];

      // year filter
      this.filtersList.forEach((element) => {
        if (
          element.display_name === this.selectedCountry &&
          element.city === this.cityList[0]
        ) {
          this.yearList.push(element.year);
        }
      });
      this.yearList = [...new Set(this.yearList)];

      // quarter filter
      this.filtersList.forEach((element) => {
        if (
          element.display_name === this.selectedCountry &&
          element.city === this.cityList[0] &&
          element.year === this.yearList[0]
        ) {
          this.quarterList.push(element.quarter);
        }
      });
      this.quarterList = [...new Set(this.quarterList)];
      this.onOptionsSelected(this.quarterList[0]);
      this.optimizerToolForm.patchValue({
        country: this.selectedCountry,
        city: this.cityList[0],
        year: this.yearList[0],
        quarter: this.quarterList[0],
        maximization: this.metricOfInterestList[0],
        category: this.categoryList[0],
      });
      this.selectedMaximization = this.metricOfInterestList[0]
      this.submitoptimizerToolForm("0");
    });
  }
  // dynamic month based on quarter select
  onOptionsSelected(value) {
    this.q1 = value === "q1";
    this.q2 = value === "q2";
    this.q3 = value === "q3";
    this.q4 = value === "q4";
    this.optimizerToolForm.patchValue({
      month: "all",
    });
  }
  // optimizer workbench page data initial load
  optimizerWorkBenchPost() {
    this.optiWorkBenchForm.patchValue({
      quarter: this.optimizerToolForm.value.quarter,
      country: this.optimizerToolForm.value.country,
      year: this.optimizerToolForm.value.year,
      city: this.optimizerToolForm.value.city,
      category: this.optimizerToolForm.value.category,
      maximization: this.selectedMaximization,
      month: this.optimizerToolForm.value.month,
    });
    const workBench = {
      year: this.optimizerToolForm.value.year,
      country: this.optimizerToolForm.value.country,
      quarter: this.optimizerToolForm.value.quarter,
      month: this.optimizerToolForm.value.month,
      category: this.optimizerToolForm.value.category,
      maximization: this.selectedMaximization,
      enterPlannedSpend: this.plannedToolRecom,
      boundary_condition: this.boundaryCond,
    };
    this.spinner.activateSpinner();
    this.optiWorkBenchPostReq = this.service
      .initialRouteOptimizerWorkbench(workBench)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.optimizerWorkbenchData = data;
          this.alertMessage = this.optimizerWorkbenchData.data.alert_message;
          this.plannedWorkBench = this.optimizerWorkbenchData.data.plannedSpend;
          this.optimizerList = this.optimizerWorkbenchData.data.optimizerWorkBench;
          this.workBenchLowerLimit = this.optimizerWorkbenchData.data.defaultAllowableChangeLowerLimit;
          this.workBenchUperLimit = this.optimizerWorkbenchData.data.defaultAllowableChangeUpperLimit;
          this.upperLimitMaxRange = this.optimizerWorkbenchData.data.defaultAllowableChangeUpperLimit;
          this.lowerLimitMinRange = this.optimizerWorkbenchData.data.defaultAllowableChangeLowerLimit;
          this.findLargeBase_NewSpend(this.optimizerList);
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // change the responsive curve graphs data on bases on Order and Aquisition
  changeCurveGraphData(value, modTab, bucket, channel, toggle, graphName) {
    if (modTab === "bucChan") {
      this.bucCHanTab = value;
    } else {
      this.oATab = value;
    }
    if (toggle.length > 0) {
      if (
        toggle[0].TopofMind === "" &&
        toggle[1].PerformanceMarketing === "" &&
        toggle[2].Incentives === ""
      ) {
        toggle = [];
      }
    } else {
      toggle = [];
    }
    const curveGraph = {
      quarter: this.optimizerToolForm.value.quarter,
      month: this.optimizerToolForm.value.month,
      category: this.optimizerToolForm.value.category,
      country: this.optimizerToolForm.value.country,
      maximization: this.selectedMaximization,
      year: this.optimizerToolForm.value.year,
      model_toggle: this.oATab,
      bucket_channel_toggle: this.bucCHanTab,
      bucket: bucket,
      channel: channel,
      toggleTrue: toggle,
      boundary_condition: this.boundaryCond,
    };
    this.orderAqui = curveGraph.model_toggle === "Order";
    this.spinner.activateSpinner();
    this.optiWorkBenchPostReq = this.service
      .postRouteResponsiveCurve(curveGraph)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.responsiveCurveData = data;
          if (data.channel_names.length > 0) {
            this.topChannel = data.channel_names[1].TopofMind;
            this.pMktChannel = data.channel_names[0].PerformanceMarketing;
            this.incenChannel = data.channel_names[2].Incentives;
          }
          if (graphName === "all") {
            this.responsiveCurveCommonGraph(
              "performanceMarketing",
              this.responsiveCurveData.data[dataNum.zero].PerformanceMarketing
            );
            this.responsiveCurveCommonGraph(
              "topOfMind",
              this.responsiveCurveData.data[dataNum.one].TopofMind
            );
            this.responsiveCurveCommonGraph(
              "incentives",
              this.responsiveCurveData.data[dataNum.two].Incentives
            );
          } else if (graphName === "topOfMinds") {
            this.responsiveCurveCommonGraph(
              "topOfMind",
              this.responsiveCurveData.data
            );
          } else if (graphName === "performanceMarketing") {
            this.responsiveCurveCommonGraph(
              "performanceMarketing",
              this.responsiveCurveData.data
            );
          } else {
            this.responsiveCurveCommonGraph(
              "incentives",
              this.responsiveCurveData.data
            );
          }
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // optimizer tool recommendation filter submit and on initial page load
  submitoptimizerToolForm(val) {
    const submitOptiToolForm = {
      quarter: this.optimizerToolForm.value.quarter,
      month: this.optimizerToolForm.value.month,
      country: this.optimizerToolForm.value.country,
      category: this.optimizerToolForm.value.category,
      planned: this.plannedToolRecom,
      year: this.optimizerToolForm.value.year,
      maximization: this.selectedMaximization,
      userPerformance: 0,
      userTopOfMind: 0,
      userIncentive: 0,
      boundary_condition: this.boundaryCond,
      userAllocationFlag: 0,
    };
    
    const splitValue = this.selectedMaximization.split(" ");
    console.log(splitValue)
    this.responsiveGraphName = splitValue[1]
    this.cookie.set("country", submitOptiToolForm.country);
    // check the value of planned key
    if (
      submitOptiToolForm.planned === null ||
      submitOptiToolForm.planned === undefined
    ) {
      submitOptiToolForm.planned = 0;
    }
    this.topOfMindSelectChannel = "";
    this.performSelectChannel = "";
    this.incentiveSelectChannel = "";
    this.spinner.activateSpinner();
    this.optiWorkBenchPostReq = this.service
      .postRouteOptimizerTool(submitOptiToolForm)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          if (data.data.solution_convergence.flag) {
            this.initialValueToolRecom = data;
            this.baseAquiToolRecom = this.initialValueToolRecom.data.baseAquisition;
            this.baseOrderToolRecom = this.initialValueToolRecom.data.baseOrder;
            this.optiToolRecom = this.initialValueToolRecom.data.optimizer_tool_recommendation;
            this.plannedToolRecom = this.initialValueToolRecom.data.planned;
            const [firstData = ([] = [])] =
              this.initialValueToolRecom.data.optimizer_user_allocation || [];
            this.responsiveCurveCommonGraph(
              "performanceMarketing",
              this.initialValueToolRecom.data.data[dataNum.zero]
                .PerformanceMarketing
            );
            this.responsiveCurveCommonGraph(
              "topOfMind",
              this.initialValueToolRecom.data.data[dataNum.one].TopofMind
            );
            this.responsiveCurveCommonGraph(
              "incentives",
              this.initialValueToolRecom.data.data[dataNum.two].Incentives
            );
            if (data.data.solution_convergence.message.length > 0) {
              alert(data.data.solution_convergence.message);
            }
          } else {
            alert(data.data.solution_convergence.message);
          }
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // Go to Scenario page
  goToScenarioPage(index) {
    this.spinner.activateSpinner();
    const ScenarioData = {
      country: this.optimizerToolForm.value.country,
      optimizer_tool_recommendation: this.optiToolRecom,
      user_clicked_row: index,
    };
    this.service
      .fetchscenarioPageData(ScenarioData)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe((data: any) => {
        sessionStorage.setItem("OptiScenarioCheck", "true");
        this.spinner.passDataToScenario(data, this.optimizerToolForm.value);
      });
  }
  // run channel optimizer button click and for data load in optimizer workbench result page
  runChannelOptimizer() {
    const optimizerResult = {
      quarter: this.optiWorkBenchForm.value.quarter,
      month: this.optiWorkBenchForm.value.month,
      country: this.optiWorkBenchForm.value.country,
      plannedWorkbench: this.plannedWorkBench,
      category: this.optimizerToolForm.value.category,
      year: this.optiWorkBenchForm.value.year,
      optimizationFor: this.optiWorkBenchForm.value.maximization,
      lowerLimitWorkbench: this.workBenchLowerLimit,
      upperLimitWorkbench: this.workBenchUperLimit,
      customizedLimitWorkbench: this.updatedTableValues,
      optimizerWorkBench: this.optimizerList,
      optiToolRecom: this.optiToolRecom,
      plannedToolRecom: this.plannedToolRecom,
      boundary_condition: this.boundaryCond,
    };
    if (
      optimizerResult.plannedToolRecom === null ||
      optimizerResult.plannedToolRecom === undefined
    ) {
      optimizerResult.plannedToolRecom = 0;
    }
    if (
      optimizerResult.plannedWorkbench === null ||
      optimizerResult.plannedWorkbench === ""
    ) {
      optimizerResult.plannedWorkbench = 0;
    }
    this.spinner.activateSpinner();
    this.optiWorkBenchPostReq = this.service
      .postRouteworkbenchResult(optimizerResult)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          console.log(data)
          if (!data.data.solution_convergence.flag) {
            this.showChannelResult = false;
            alert(data.data.solution_convergence.message);
            $("#countryOptimizerResult").css({ display: "none" });
            $("#countryWorkBench").css({ display: "block" });
          } else {
            this.showChannelResult = true;
            this.optimizerWorkBenchResult = data;
            this.plannedWorkBenchResult = this.optimizerWorkBenchResult.data.plannedSpend;
            this.baseAquiWorkBench = this.optimizerWorkBenchResult.data.baseAquiToolRecom;
            this.baseOrderWorkBench = this.optimizerWorkBenchResult.data.baseOrderToolRecom;
            this.countryWiseResult = this.optimizerWorkBenchResult.data.optimizerWorkBench;
            this.optiWorkbenchResultData = this.optimizerWorkBenchResult.data.optiToolRecom;
            this.findLargeBase_NewSpend(this.countryWiseResult);
            this.forPath = this.optimizerWorkBenchResult.data.downloadexcel;
            this.downloadUrl =
            environment.URL.slice(-environment.URL.length, -1) + this.forPath;
          }
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // to update the values in the table of lower limit and upper limit
  customizedLimitChange(loValue, type, channel, index, upValue, i) {
    const lowerLimit = {
      customChargeLowerLimit: loValue,
      type: type,
      channel: channel[index],
      index: index,
      customChargeUpperLimit: upValue,
      typeindex: i.toString() + index.toString(),
    };
    if (
      lowerLimit.customChargeLowerLimit > 50 ||
      lowerLimit.customChargeLowerLimit < this.lowerLimitMinRange
    ) {
      alert(this.alertMessage);
    }
    if (
      lowerLimit.customChargeUpperLimit > this.upperLimitMaxRange ||
      lowerLimit.customChargeUpperLimit < -50
    ) {
      alert(this.alertMessage);
    }
    let foundAtIndex;
    if (this.updatedTableValues.length !== 0) {
      let found = this.updatedTableValues.some(
        (el) => el.typeindex === lowerLimit.typeindex
      );
      if (!found) {
        this.updatedTableValues.push(lowerLimit);
      } else {
        foundAtIndex = this.updatedTableValues.findIndex(
          (x) => x.typeindex === lowerLimit.typeindex
        );
        this.updatedTableValues.splice(foundAtIndex, 1);
        this.updatedTableValues.push(lowerLimit);
      }
    } else {
      this.updatedTableValues.push(lowerLimit);
    }
  }
  // download data scenario planner details
  public async downloadZip(): Promise<void> {
    const blob = await this.spinner.downloadResource(this.downloadUrl);
    const url = window.URL.createObjectURL(blob);
    const link = this.downloadOptimizer.nativeElement;
    link.href = url;
    link.download = this.forPath.split("/").pop();
    link.click();
    window.URL.revokeObjectURL(url);
  }
  downloadDetails() {
    this.spinner.activateSpinner();
    this.downloadZip();
    this.spinner.deactivateSpinner();
  }
  checkOptimizationSelect() {
    if (
     this.selectedMaximization === "Maximize Acquisitions" ||
     this.selectedMaximization === "Target Acquisitions"
    ) {
      this.clickAquisitionTab.nativeElement.click();
      this.clickBucketTab.nativeElement.click();
    } else if (
     this.selectedMaximization === "Maximize Orders" ||
     this.selectedMaximization === "Target Orders"
    ) {
      this.clickOrderTab.nativeElement.click();
      this.clickBucketTab.nativeElement.click();
    }
  }
  // responsive curve graphs for top of mind, performance marketing and incentive
  responsiveCurveCommonGraph(graphName, graphData: any | undefined | null) {
    this.graphValuelength = graphData.filter(
      (element) => element.value === 0
    ).length;
    this.checkGraphValue = graphData.length === this.graphValuelength;
    var topOfMind = am4core.create(graphName, am4charts.XYChart);
    topOfMind.paddingRight = 20;
    topOfMind.data = graphData;
    if (!this.checkGraphValue) {
      topOfMind.numberFormatter.numberFormat = "#.#a";
      topOfMind.numberFormatter.bigNumberPrefixes = [
        { number: 1e3, suffix: "K" },
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ];
    }
    var categoryAxis = topOfMind.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "spends";
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.title.text = "Spend";
    categoryAxis.renderer.grid.template.disabled = true;
    // Y axis Aquisitions
    var valueAxis = topOfMind.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;
    valueAxis.renderer.grid.template.disabled = true;
    // Y axis for CPA
    var valueAxis2 = topOfMind.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.baseValue = 0;
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.grid.template.disabled = true;
    valueAxis2.numberFormatter = new am4core.NumberFormatter();
    valueAxis2.numberFormatter.numberFormat = "#.##";
    // series value max
    var series1 = topOfMind.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "value_max";
    series1.dataFields.categoryX = "spends";
    series1.tensionX = 1;
    series1.name = "Upper Bound";
    series1.legendSettings.labelText = "[bold {stroke}]{name}[/]";
    series1.yAxis = valueAxis;
    var bullet1 = series1.bullets.push(new am4charts.Bullet());
    bullet1.tooltipText = "{valueY}";
    // series value
    var series2 = topOfMind.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value";
    series2.dataFields.categoryX = "spends";
    series2.legendSettings.labelText = "[bold {stroke}]{name}[/]";
    series2.tensionX = 1;
    series2.yAxis = valueAxis;
    var bullet2 = series2.bullets.push(new am4charts.Bullet());
    bullet2.tooltipText = "{valueY}";
    // series value min
    var series3 = topOfMind.series.push(new am4charts.LineSeries());
    series3.dataFields.valueY = "value_min";
    series3.dataFields.categoryX = "spends";
    series3.tensionX = 1;
    series3.name = "Lower Bound";
    series3.yAxis = valueAxis;
    series3.legendSettings.labelText = "[bold {stroke}]{name}[/]";
    var bullet3 = series3.bullets.push(new am4charts.Bullet());
    bullet3.tooltipText = "{valueY}";
    topOfMind.cursor = new am4charts.XYCursor();
    // Cpa_Cpo
    var series4 = topOfMind.series.push(new am4charts.ColumnSeries());
    series4.dataFields.categoryX = "spends";
    series4.dataFields.valueY = "cpa_cpo";
    // console.log(this.responsiveGraphName)
      valueAxis.title.text = this.responsiveGraphName;
      series2.name = this.responsiveGraphName;
    
    if (this.responsiveGraphName === 'GMV') {
      valueAxis2.title.text = "ROI";;
      series4.name = "ROI";
    } else if (this.responsiveGraphName === 'Acquisitions') {
      valueAxis2.title.text = "CPA";
      series4.name = "CPA";
    } else{
      valueAxis2.title.text = "CPO";
      series4.name = "CPO";
    }
    series4.sequencedInterpolation = true;
    series4.fillOpacity = 0;
    series4.strokeOpacity = 0.5;
    series4.strokeWidth = 0;
    series4.yAxis = valueAxis2;
    series4.legendSettings.labelText = "[bold {stroke}]{name}[/]";
    series4.columns.template.stroke = am4core.color("#");
    series4.columns.template.width = 0.01;
    series4.tooltip.pointerOrientation = "horizontal";
    var bullet4 = series4.bullets.push(new am4charts.Bullet());
    bullet4.tooltipText = "{valueY.formatNumber('#')}";
    var square = bullet4.createChild(am4core.Rectangle);
    square.width = 4;
    square.height = 4;
    square.horizontalCenter = "middle";
    square.verticalCenter = "middle";
    // planned_spend_y_axis
    var series5 = topOfMind.series.push(new am4charts.ColumnSeries());
    series5.dataFields.categoryX = "spends";
    series5.dataFields.valueY = "planned_spend_y_axis";
    series5.tooltipText = "Planned Spend";
    series5.name = "Planned Spend";
    series5.sequencedInterpolation = true;
    series5.fillOpacity = 0;
    series5.strokeOpacity = 1;
    series5.yAxis = valueAxis;
    series5.columns.template.width = 0.01;
    series5.columns.template.fill = am4core.color("#5a5");
    series5.stroke = am4core.color("#5a5");
    series5.tooltip.pointerOrientation = "horizontal";
    series5.legendSettings.labelText = "[bold {stroke}]{name}[/]";
    var bullet5 = series5.bullets.create(am4charts.CircleBullet);
    bullet5.tooltipText = "Planned Spend";
    bullet5.stroke = am4core.color("#5a5");
    bullet5.fill = am4core.color("#5a5");
    topOfMind.cursor.lineY.disabled = true;
    topOfMind.cursor.lineX.disabled = true;
    // Legend
    topOfMind.legend = new am4charts.Legend();
    topOfMind.legend.markers.template.disabled = true;
    topOfMind.legend.labels.template.text = "[bold {color}]{name}[/]";
    topOfMind.legend.fontSize = 10;
    topOfMind.exporting.menu = new am4core.ExportMenu();
  }
  // to find large base and new spend
  findLargeBase_NewSpend(list) {
    this.totalBase = [];
    this.totalNew = [];
    list.forEach((element) => {
      this.totalBase.push(element.baseSpendNum);
      this.totalNew.push(element.thresholdSpendNum);
    });
    this.largerBase = Math.max(...this.totalBase);
    this.largerNew = Math.max(...this.totalNew);
  }
}
