// Core modules imports
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

// Third party imports
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { finalize } from "rxjs/operators";
import { Subscription } from "rxjs";
import { CookieService } from "ngx-cookie-service";

// Application imports
import { BusinessSummaryService } from "src/app/services/businessSummary.service";
import { SpinnerServiceService } from "src/app/services/spinner-service.service";

enum dataNum {
  zero,
  one,
  two,
  three,
  four,
}
@Component({
  selector: "app-business-summary",
  templateUrl: "./business-summary.component.html",
  styleUrls: ["./business-summary.component.css"],
})
export class BusinessSummaryComponent implements OnInit {
  // for storing data
  initialData: any | undefined | null = [];
  bucketData: any | undefined | null = [];
  incentivesData: any | undefined | null = [];
  spendDisBucketData: any | undefined | null = [];
  qoqData: any | undefined | null = [];
  businessSummaryForm: FormGroup;
  // upper five values
  totalSpendValue: any | undefined | null;
  noOfAcquisitionValue: any | undefined | null;
  noOfOrderValue: any | undefined | null;
  totalIncentivesValue: any | undefined | null;
  totalMarketingSpendValue: any | undefined | null;
  // for initial selected data
  bucketSelected = "Social/Digital";
  distributionTypeSelected = "efficiency";
  metricSelected = "acquistions";
  groupSelected = "bucket";
  compareOn = "qoq";
  spendView = "grouped";
  // distribution different channels list array
  disChannelArray: any | undefined | null = [];
  // channels array for bucket attribution graphs
  channelArray: any | undefined | null = [];
  // array mapping
  disChannelArrayMap: any | undefined | null = [];
  effi = true;
  orderAqui = false;
  bucketChannelGraph = false;
  // submit filters variable required
  chartSelection = "comparison";
  spendViewNew = "grouped";
  metricSelectedNew = "qoq";
  dropdown = "Social/Digital";
  bucketSpecific = "Social/Digital";
  bucketSpecificChannel = "Social/Digital";
  postSubmitReq: Subscription;
  performance = true;
  topOfMind = false;
  incentives = false;
  q0 = true;
  q1 = false;
  q2 = false;
  q3 = false;
  q4 = false;
  countryList: any = [];
  yearList: any = [];
  quarterList: any = [];
  filtersList: any = [];
  categoryList: any = [];
  KPIlist: any = [];
  cityList: any = [];
  selectedCountry = "";
  kpiValueSelected = ""
  kpiValueForDistribution = '';
  kpiValueForQoq = '';
  kpiValueForSummary = ''
  constructor(
    private service: BusinessSummaryService,
    private formBuilder: FormBuilder,
    private spinner: SpinnerServiceService,
    private cookie: CookieService
  ) {}
  // dynamic month based on quarter select
  onQuarterSelect(value) {
    this.q0 = value === "all";
    this.q1 = value === "q1";
    this.q2 = value === "q2";
    this.q3 = value === "q3";
    this.q4 = value === "q4";
    this.businessSummaryForm.patchValue({
      month: "0",
    });
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
      this.onQuarterSelect(this.quarterList[this.quarterList.length - 1]);
      this.businessSummaryForm.patchValue({
        city: this.cityList[0],
        year: this.yearList[0],
        quarter: this.quarterList[this.quarterList.length - 1],
      });
    } else if (filter === "city") {
      this.quarterList = [];
      this.yearList = [];
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
      this.onQuarterSelect(this.quarterList[this.quarterList.length - 1]);
      this.businessSummaryForm.patchValue({
        year: this.yearList[0],
        quarter: this.quarterList[this.quarterList.length - 1],
      });
    }
    else {
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
      this.onQuarterSelect(this.quarterList[this.quarterList.length - 1]);
      this.businessSummaryForm.patchValue({
        quarter: this.quarterList[this.quarterList.length - 1],
      });
    }
  }
  // Select KPI
  selectKPI(value){
    this.kpiValueSelected = value
  }
  // on page load function
  ngOnInit(): void {
    this.businessSummaryForm = this.formBuilder.group({
      quarter: ["all"],
      country: [""],
      city:[""],
      category: [''],
      year: ["2020"],
      month: ["0"],
    });
    this.selectedCountry = this.cookie.get("country");
    this.service.dynamicRoute().subscribe((data: any) => {
      this.countryList = data.data.countries;
      this.categoryList = data.data.categories;
      this.KPIlist = data.data.kpi
      this.kpiValueSelected = this.KPIlist[0]
      if (!this.selectedCountry || this.selectedCountry === "undefined") {
        this.selectedCountry = this.countryList[0];
      }
      this.filtersList = data.data.time_period;
      // city filter
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
      this.onQuarterSelect(this.quarterList[this.quarterList.length - 1]);
      this.businessSummaryForm.patchValue({
        country: this.selectedCountry,
        city:  this.cityList[0],
        year: this.yearList[0],
        quarter: this.quarterList[this.quarterList.length - 1],
        category: this.categoryList[0]
      });
      this.selectedCountry = this.selectedCountry;
      this.submitbusinessSummaryForm();
    });
  }
  // Submit button click function
  submitbusinessSummaryForm() {
    const submitFormFilters = {
      year: this.businessSummaryForm.value.year,
      quarter: this.businessSummaryForm.value.quarter,
      country: this.businessSummaryForm.value.country,
      month: this.businessSummaryForm.value.month,
      category: this.businessSummaryForm.value.category,
      kpi: this.kpiValueSelected, 
      distribution_type: this.distributionTypeSelected,
      bucket: this.bucketSelected,
      chart_selection: this.chartSelection,
      filter1_selection: this.metricSelectedNew,
      filter2_selection: this.spendViewNew,
      filter3_selection: this.dropdown,
    };
    this.cookie.set("country", submitFormFilters.country);
    this.spinner.activateSpinner();
    this.postSubmitReq = this.service
      .postFilter(submitFormFilters)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.kpiValueForSummary = this.kpiValueSelected
          this.initialData = data;
          this.QoqClick();
          this.bucketAttributeClick();
          this.totalSpendValue = this.initialData.business_summary[
            dataNum.zero
          ].value;
          this.noOfOrderValue = this.initialData.business_summary[
            dataNum.one
          ].value;
          this.totalIncentivesValue = this.initialData.business_summary[
            dataNum.three
          ].value;
          this.totalMarketingSpendValue = this.initialData.business_summary[
            dataNum.two
          ].value;
          const [firstData = ([] = [])] =
            this.initialData.distribution_data || [];
            
          if (submitFormFilters.distribution_type === "efficiency") {
            if(this.kpiValueSelected === 'GMV'){
              this.kpiValueForDistribution = 'ROI'
            } else if(this.kpiValueSelected === 'Net New Customer') {
              this.kpiValueForDistribution = 'Cost of Acquisitions'
            } else if(this.kpiValueSelected === 'Orders'){
              this.kpiValueForDistribution = 'Cost of Order'
            } else  if(this.kpiValueSelected === 'Contribution Margin'){
              this.kpiValueForDistribution = 'ROMI'
            }
            this.arrayMapping(firstData.channel_data.channel);
            this.distributionSpendGraph(
              "spendDistributionspend",
              firstData.bucket_data.Spend
            );
            this.distributionAquiOrderGraph(
              "spendDistributionroi",
              firstData.bucket_data.Calc_Column
            );
            this.distributionSpendGraph(
              "performanceMarketingspend",
              firstData.channel_data.Spend
            );
            this.distributionAquiOrderGraph(
              "performanceMarketingorder",
              firstData.channel_data.Calc_Column
            );
          } else {
              this.kpiValueForDistribution =this.kpiValueSelected
            this.arrayMapping(firstData.channel_data.channel);
            this.distributionAquiOrderGraph(
              "spendDistributionroi",
              firstData.bucket_data.selected_kpi
            );
            this.distributionSpendGraph(
              "spendDistributionspend",
              firstData.bucket_data.Spend
            );
            this.distributionSpendGraph(
              "performanceMarketingspend",
              firstData.channel_data.Spend
            );
            this.distributionAquiOrderGraph(
              "performanceMarketingorder",
              firstData.channel_data.selected_kpi
            );
          }
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // distribution select efficiency/effectiveness
  distributionSelectFun(distributionSelect) {
    this.spinner.activateSpinner();
    this.effi = !(distributionSelect === "effective");
    this.distributionTypeSelected = distributionSelect;
    const distrubution = {
      year: this.businessSummaryForm.value.year,
      quarter: this.businessSummaryForm.value.quarter,
      country: this.businessSummaryForm.value.country,
      month: this.businessSummaryForm.value.month,
      category: this.businessSummaryForm.value.category,
      kpi: this.kpiValueSelected, 
      distribution_type: this.distributionTypeSelected,
      bucket: this.bucketSelected,
      chart_selection: "distribution",
    };
    this.postSubmitReq = this.service
      .combineRoute(distrubution)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.spendDisBucketData = data;
          const [firstData = ([] = [])] = this.spendDisBucketData.data || [];
          if (distributionSelect === "efficiency") {
            if(this.kpiValueSelected === 'GMV'){
              this.kpiValueForDistribution = 'ROI'
            } else if(this.kpiValueSelected === 'Net New Customer') {
              this.kpiValueForDistribution = 'Cost of Acquisitions'
            } else if(this.kpiValueSelected === 'Orders'){
              this.kpiValueForDistribution = 'Cost of Order'
            } else  if(this.kpiValueSelected === 'Contribution Margin'){
              this.kpiValueForDistribution = 'ROMI'
            }
            this.arrayMapping(firstData.channel_data.channel);
            this.distributionSpendGraph(
              "spendDistributionspend",
              firstData.bucket_data.Spend
            );
            this.distributionAquiOrderGraph(
              "spendDistributionroi",
              firstData.bucket_data.Calc_Column
            );
            this.distributionSpendGraph(
              "performanceMarketingspend",
              firstData.channel_data.Spend
            );
            this.distributionAquiOrderGraph(
              "performanceMarketingorder",
              firstData.channel_data.Calc_Column
            );
          } else {
            this.kpiValueForDistribution = this.kpiValueSelected
            this.arrayMapping(firstData.channel_data.channel);

            this.distributionAquiOrderGraph(
              "spendDistributionroi",
              firstData.bucket_data.selected_kpi
            );
            this.distributionSpendGraph(
              "spendDistributionspend",
              firstData.bucket_data.Spend
            );
            this.distributionSpendGraph(
              "performanceMarketingspend",
              firstData.channel_data.Spend
            );
            this.distributionAquiOrderGraph(
              "performanceMarketingorder",
              firstData.channel_data.selected_kpi
            );
          }
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // channel Specific Select Performance marketing/Top of mind/Incentive
  channelSpecificClick(channelSelect) {
    this.bucketSelected = channelSelect;
    const channel = {
      year: this.businessSummaryForm.value.year,
      quarter: this.businessSummaryForm.value.quarter,
      country: this.businessSummaryForm.value.country,
      month: this.businessSummaryForm.value.month,
      distribution_type: this.distributionTypeSelected,
      category: this.businessSummaryForm.value.category,
      kpi: this.kpiValueSelected, 
      bucket: this.bucketSelected,
      chart_selection: "channel_distribution",
    };
    this.spinner.activateSpinner();
    this.postSubmitReq = this.service
      .combineRoute(channel)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.incentivesData = data;
          if (channel.distribution_type === "efficiency") {
            if(this.kpiValueSelected === 'GMV'){
              this.kpiValueForDistribution = 'ROI'
            } else if(this.kpiValueSelected === 'Net New Customer') {
              this.kpiValueForDistribution = 'Cost of Acquisitions'
            } else if(this.kpiValueSelected === 'Orders'){
              this.kpiValueForDistribution = 'Cost of Order'
            } else  if(this.kpiValueSelected === 'Contribution Margin'){
              this.kpiValueForDistribution = 'ROMI'
            }
            this.arrayMapping(this.incentivesData.data.channel);
            this.distributionSpendGraph(
              "performanceMarketingspend",
              this.incentivesData.data.Spend
            );
            this.distributionAquiOrderGraph(
              "performanceMarketingorder",
              this.incentivesData.data.Calc_Column
            );
          } else {
            this.kpiValueForDistribution =  this.kpiValueSelected
            this.arrayMapping(this.incentivesData.data.channel);
            this.distributionSpendGraph(
              "performanceMarketingspend",
              this.incentivesData.data.Spend
            );
            this.distributionAquiOrderGraph(
              "performanceMarketingorder",
              this.incentivesData.data.selected_kpi
            );
          }
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // Bucket attributation tab click
  bucketAttributeClick() {
    if (this.metricSelectedNew === "qoq" || this.metricSelectedNew === "yoy") {
      this.metricSelectedNew = "orders";
    }
    if (this.spendViewNew === "grouped") {
      this.spendViewNew = "bucket";
    }
    this.chartSelection = "attribution";
    const bucketAttribution = {
      year: this.businessSummaryForm.value.year,
      quarter: this.businessSummaryForm.value.quarter,
      country: this.businessSummaryForm.value.country,
      month: this.businessSummaryForm.value.month,
      metric: this.metricSelected,
      category: this.businessSummaryForm.value.category,
      kpi: this.kpiValueSelected, 
      group: this.groupSelected,
      bucket: this.bucketSpecificChannel,
      chart_selection: "attribution",
    };
    this.spinner.activateSpinner();
    this.postSubmitReq = this.service
      .combineRoute(bucketAttribution)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.bucketData = data;
          
            if (!this.bucketChannelGraph) {
              this.bucketOrderCommonGraph(
                "weeklyTrendspend",
                this.bucketData.data.Spend,
                "spend"
              );
              this.bucketOrderCommonGraph(
                "weeklyTrendorder",
                this.bucketData.data.selected_kpi,
                "order"
              );
            } else {
              this.bucketOrderChannelCommonGraph(
                "weeklyTrendspendChannel",
                this.bucketData.data.Spend,
                "spend"
              );
              this.bucketOrderChannelCommonGraph(
                "weeklyTrendorderchannel",
                this.bucketData.data.selected_kpi,
                "order"
              );
            }
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  bucketBucketClick() {
    if (this.metricSelectedNew === "qoq" || this.metricSelectedNew === "yoy") {
      this.metricSelectedNew = "orders";
    }
    this.groupSelected = "bucket";
    this.spendViewNew = "bucket";
    this.bucketChannelGraph = false;
    const bucket = {
      year: this.businessSummaryForm.value.year,
      quarter: this.businessSummaryForm.value.quarter,
      country: this.businessSummaryForm.value.country,
      month: this.businessSummaryForm.value.month,
      metric: this.metricSelected,
      category: this.businessSummaryForm.value.category,
      kpi: this.kpiValueSelected, 
      group: this.groupSelected,
      chart_selection: "attribution",
    };
    this.spinner.activateSpinner();
    this.postSubmitReq = this.service
      .combineRoute(bucket)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.bucketData = data;
            this.bucketOrderCommonGraph(
              "weeklyTrendorder",
              this.bucketData.data.selected_kpi,
              "order"
            );
            this.bucketOrderCommonGraph(
              "weeklyTrendspend",
              this.bucketData.data.Spend,
              "spend"
            );
        },
        (err: any) => {
          this.spinner.error();
        }
      )
      .add(() => {
        this.spinner.deactivateSpinner();
      });
  }
  // Bucket attributation channel tab's dropdown value fetch
  onOptionsSelectedBucket(value) {
    this.bucketSpecificChannel = value;
    this.dropdown = this.bucketSpecificChannel;
    this.channelBucketClick();
  }
  // Bucket attributation channel tab click
  channelBucketClick() {
    if (this.metricSelectedNew === "qoq" || this.metricSelectedNew === "yoy") {
      this.metricSelectedNew = "orders";
    }
    this.groupSelected = "channel";
    this.spendViewNew = "channel";
    this.bucketChannelGraph = true;
    const bucketChannel = {
      year: this.businessSummaryForm.value.year,
      quarter: this.businessSummaryForm.value.quarter,
      country: this.businessSummaryForm.value.country,
      month: this.businessSummaryForm.value.month,
      metric: this.metricSelected,
      group: this.groupSelected,
      category: this.businessSummaryForm.value.category,
      kpi: this.kpiValueSelected, 
      bucket: this.bucketSpecificChannel,
      chart_selection: "attribution",
    };
    this.spinner.activateSpinner();
    this.postSubmitReq = this.service
      .combineRoute(bucketChannel)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.bucketData = data;
          this.channelArray = this.bucketData.data.xaxis;
            this.bucketOrderChannelCommonGraph(
              "weeklyTrendorderchannel",
              this.bucketData.data.selected_kpi,
              "order"
            );
            this.bucketOrderChannelCommonGraph(
              "weeklyTrendspendChannel",
              this.bucketData.data.Spend,
              "spend"
            );
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // Qoq/yoy tab click
  QoqClick() {
    if (
      this.metricSelectedNew === "orders" ||
      this.metricSelectedNew === "acquistions"
    ) {
      this.metricSelectedNew = "qoq";
    }
    if (this.spendViewNew === "bucket") {
      this.spendViewNew = "grouped";
    }
    this.chartSelection = "comparison";
    const qoq = {
      year: this.businessSummaryForm.value.year,
      quarter: this.businessSummaryForm.value.quarter,
      country: this.businessSummaryForm.value.country,
      month: this.businessSummaryForm.value.month,
      compare_on: this.compareOn,
      category: this.businessSummaryForm.value.category,
      kpi: this.kpiValueSelected, 
      spend_view: this.spendView,
      chart_selection: "comparison",
    };
    this.spinner.activateSpinner();
    this.postSubmitReq = this.service
      .combineRoute(qoq)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.kpiValueForQoq = this.kpiValueSelected
          this.qoqData = data;
          const colorArray = [
            "#43CAEA",
            "#2eb5ce",
            "#32c5a2",
            "#5180ca",
            "#43CAEA",
          ];
          if (this.spendView === "grouped") {
            this.qoqData.data.Spend.forEach((element, i) => {
              element.color1 = colorArray[i % colorArray.length];
            });
            this.qoqData.data.selected_kpi.forEach((element, i) => {
              element.color1 = colorArray[i % colorArray.length];
            });
          } else {
            this.qoqData.data.Spend.forEach((element, i) => {
              element.color1 = colorArray[0];
            });
            this.qoqData.data.selected_kpi.forEach((element, i) => {
              element.color1 = colorArray[2];
            });
          }
          this.QoqYoyCommonGraph(
            "QoQYoYComparisonspend",
            this.qoqData.data.Spend
          );
          this.QoqYoyCommonGraph(
            "QoQYoYComparisonorder",
            this.qoqData.data.selected_kpi
          );
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // qoq/yoy tab select
  qoqYoySelect(tabSelect) {
    this.compareOn = tabSelect;
    this.metricSelectedNew = tabSelect;
    const qoqYoy = {
      year: this.businessSummaryForm.value.year,
      quarter: this.businessSummaryForm.value.quarter,
      country: this.businessSummaryForm.value.country,
      month: this.businessSummaryForm.value.month,
      compare_on: this.compareOn,
      spend_view: this.spendView,
      category: this.businessSummaryForm.value.category,
      kpi: this.kpiValueSelected, 
      bucket: this.bucketSpecific,
      chart_selection: "comparison",
    };
    this.spinner.activateSpinner();
    this.postSubmitReq = this.service
      .combineRoute(qoqYoy)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.kpiValueForQoq = this.kpiValueSelected
          this.qoqData = data;
          const colorArray = [
            "#43CAEA",
            "#2eb5ce",
            "#32c5a2",
            "#5180ca",
            "#43CAEA",
          ];
          if (this.spendView === "grouped") {
            this.qoqData.data.Spend.forEach((element, i) => {
              element.color1 = colorArray[i % colorArray.length];
            });
            this.qoqData.data.selected_kpi.forEach((element, i) => {
              element.color1 = colorArray[i % colorArray.length];
            });
          } else {
            this.qoqData.data.Spend.forEach((element, i) => {
              element.color1 = colorArray[0];
            });
            this.qoqData.data.selected_kpi.forEach((element, i) => {
              element.color1 = colorArray[2];
            });
          }
          this.QoqYoyCommonGraph(
            "QoQYoYComparisonspend",
            this.qoqData.data.Spend
          );
          this.QoqYoyCommonGraph(
            "QoQYoYComparisonorder",
            this.qoqData.data.selected_kpi
          );
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // Qoq/yoy channel specific tab dropdown value fetch
  onOptionsSelected(value) {
    this.bucketSpecific = value;
    this.dropdown = this.bucketSpecific;
    this.qoqChannelClick();
  }
  // Qoq/yoy channel specific tab click
  qoqChannelClick() {
    if (
      this.metricSelectedNew === "orders" ||
      this.metricSelectedNew === "acquistions"
    ) {
      this.metricSelectedNew = "qoq";
    }
    this.spendView = "channel";
    this.spendViewNew = "channel";
    const qoqYoyChannel = {
      year: this.businessSummaryForm.value.year,
      quarter: this.businessSummaryForm.value.quarter,
      country: this.businessSummaryForm.value.country,
      month: this.businessSummaryForm.value.month,
      category: this.businessSummaryForm.value.category,
      kpi: this.kpiValueSelected, 
      compare_on: this.compareOn,
      spend_view: this.spendView,
      bucket: this.bucketSpecific,
      chart_selection: "comparison",
    };
    this.spinner.activateSpinner();
    this.postSubmitReq = this.service
      .combineRoute(qoqYoyChannel)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.kpiValueForQoq = this.kpiValueSelected
          this.qoqData = data;
          const colorArray = [
            "#43CAEA",
            "#2eb5ce",
            "#32c5a2",
            "#5180ca",
            "#43CAEA",
          ];
          this.qoqData.data.Spend.forEach((element, i) => {
            element.color1 = colorArray[0];
          });
          this.qoqData.data.selected_kpi.forEach((element, i) => {
            element.color1 = colorArray[2];
          });
          this.QoqYoyCommonGraph(
            "QoQYoYComparisonspend",
            this.qoqData.data.Spend
          );
          this.QoqYoyCommonGraph(
            "QoQYoYComparisonorder",
            this.qoqData.data.selected_kpi
          );
          this.spinner.deactivateSpinner();
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // Qoq/yoy grouped tab click
  qoqGroupClick() {
    if (
      this.metricSelectedNew === "orders" ||
      this.metricSelectedNew === "acquistions"
    ) {
      this.metricSelectedNew = "qoq";
    }
    this.spendView = "grouped";
    this.spendViewNew = "grouped";
    const qoqYoyGroup = {
      year: this.businessSummaryForm.value.year,
      category: this.businessSummaryForm.value.category,
      kpi: this.kpiValueSelected, 
      quarter: this.businessSummaryForm.value.quarter,
      country: this.businessSummaryForm.value.country,
      month: this.businessSummaryForm.value.month,
      compare_on: this.compareOn,
      spend_view: this.spendView,
      chart_selection: "comparison",
    };
    this.spinner.activateSpinner();
    this.postSubmitReq = this.service
      .combineRoute(qoqYoyGroup)
      .pipe(finalize(() => this.spinner.deactivateSpinner()))
      .subscribe(
        (data: any) => {
          this.kpiValueForQoq = this.kpiValueSelected
          this.qoqData = data;
          const colorArray = [
            "#43CAEA",
            "#2eb5ce",
            "#32c5a2",
            "#5180ca",
            "#43CAEA",
          ];
          this.qoqData.data.Spend.forEach((element, i) => {
            element.color1 = colorArray[i % colorArray.length];
          });
          this.qoqData.data.selected_kpi.forEach((element, i) => {
            element.color1 = colorArray[i % colorArray.length];
          });
          this.QoqYoyCommonGraph(
            "QoQYoYComparisonspend",
            this.qoqData.data.Spend
          );
          this.QoqYoyCommonGraph(
            "QoQYoYComparisonorder",
            this.qoqData.data.selected_kpi
          );
        },
        (err: any) => {
          this.spinner.error();
        }
      );
  }
  // array mapping
  arrayMapping(list: any | undefined | null) {
    this.disChannelArrayMap = [];
    list.forEach((element) => {
      this.disChannelArrayMap.push(element);
    });
  }
  // spend distributions graphs
  distributionSpendGraph(graphName, graphData: any | undefined | null) {
    var spendDisSpend = am4core.create(graphName, am4charts.XYChart);
    spendDisSpend.data = graphData;
    var categoryAxis = spendDisSpend.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "yaxis";
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;
    categoryAxis.renderer.labels.template.fontSize = 0;
    categoryAxis.renderer.labels.template.__disabled = true;
    categoryAxis.renderer.grid.template.disabled = true;
    var valueAxis = spendDisSpend.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 0;
    valueAxis.renderer.grid.template.disabled = true;
   
    valueAxis.renderer.inversed = true;
    valueAxis.extraMin = 0.09;
    valueAxis.extraMax = 0.09;
    function createSeriesSpend(field, name, color) {
      var series = spendDisSpend.series.push(new am4charts.ColumnSeries());
      series.columns.template.width = am4core.percent(90);
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "yaxis";
      series.name = name;
      series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
      series.columns.template.column.fill = am4core.color(color);
      series.columns.template.column.stroke = am4core.color(color);
      var valueLabel = series.bullets.push(new am4charts.LabelBullet());
     
      valueLabel.label.dx = -5;
        valueLabel.label.horizontalCenter = "right";
        valueLabel.label.align = "center";
        valueLabel.label.text = "[#212529]{valueX}";
        valueLabel.label.fontSize = 12;
        valueLabel.label.hideOversized = false;
          valueLabel.label.truncate = false;
        valueLabel.label.tooltipText = "{name}: [bold]{valueX}[/]";
      spendDisSpend.maskBullets = false;
      var cellSize = 75;
      spendDisSpend.events.on("datavalidated", function (ev) {
        var chart = ev.target;
        var categoryAxis = chart.yAxes.getIndex(0);
        var adjustHeight =
          chart.data.length * cellSize - categoryAxis.pixelHeight;
        var targetHeight = chart.pixelHeight + adjustHeight;
        chart.svgContainer.htmlElement.style.height = targetHeight + "px";
      });
      spendDisSpend.numberFormatter.numberFormat = "#.#a";
      spendDisSpend.numberFormatter.bigNumberPrefixes = [
        { number: 1e3, suffix: "K" },
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ];
    }
    createSeriesSpend("optimal", "optimal", "#d5e4e7");
    createSeriesSpend("base", "base", "#34C4E6");
  }
  // Performance market graphs
  distributionAquiOrderGraph(graphName, graphData: any | undefined | null) {
    if (this.distributionTypeSelected === "efficiency") {
      var spendDisOrder = am4core.create(graphName, am4charts.XYChart);
      spendDisOrder.data = graphData;
      var categoryAxis = spendDisOrder.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "yaxis";
      categoryAxis.renderer.cellStartLocation = 0.1;
      categoryAxis.renderer.cellEndLocation = 0.9;
      categoryAxis.renderer.labels.template.fontSize = 0;
      categoryAxis.renderer.labels.template.__disabled = true;
      categoryAxis.renderer.grid.template.disabled = true;
      var valueAxis = spendDisOrder.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.labels.template.fontSize = 0;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.extraMin = 0.09;
      valueAxis.extraMax = 0.09;
      function createSeriesOrder(field, name, color) {
        var series = spendDisOrder.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = field;
        series.dataFields.categoryY = "yaxis";
        series.name = name;
        series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
        series.columns.template.width = am4core.percent(90);
        series.columns.template.column.fill = am4core.color(color);
        series.columns.template.column.stroke = am4core.color(color);
        var valueLabel = series.bullets.push(new am4charts.LabelBullet());
        valueLabel.label.text = "[#212529]{valueX}";
        valueLabel.label.horizontalCenter = "left";
        spendDisOrder.maskBullets = false;
        valueLabel.label.dx = 4;
        valueLabel.label.fontSize = 12;
        valueLabel.label.hideOversized = false;
        valueLabel.label.truncate = false;
        valueLabel.label.tooltipText = "{name}: [bold]{valueX}[/]";
        var cellSize = 75;
        spendDisOrder.events.on("datavalidated", function (ev) {
          var chart = ev.target;
          var categoryAxis = chart.yAxes.getIndex(0);
          var adjustHeight =
            chart.data.length * cellSize - categoryAxis.pixelHeight;
          var targetHeight = chart.pixelHeight + adjustHeight;
          chart.svgContainer.htmlElement.style.height = targetHeight + "px";
        });
        spendDisOrder.numberFormatter.numberFormat = "#.##";
      }
      createSeriesOrder("optimal", "optimal", "#d5e4e7");
      createSeriesOrder("base", "base", "#34C4E6");
    } else {
      var spendDisOrder = am4core.create(graphName, am4charts.XYChart);
      spendDisOrder.data = graphData;
      var categoryAxis = spendDisOrder.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "yaxis";
      categoryAxis.renderer.cellStartLocation = 0.1;
      categoryAxis.renderer.cellEndLocation = 0.9;
      categoryAxis.renderer.labels.template.fontSize = 0;
      categoryAxis.renderer.labels.template.__disabled = true;
      categoryAxis.renderer.grid.template.disabled = true;
      var valueAxis = spendDisOrder.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.labels.template.fontSize = 0;
      valueAxis.renderer.grid.template.disabled = true;
      if(graphName === 'performanceMarketingorder'){
        valueAxis.extraMin = 0.09;
      valueAxis.extraMax = 0.09;
      }
      
      function createSeriesOrder(field, name, color) {
        var series = spendDisOrder.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = field;
        series.dataFields.categoryY = "yaxis";
        series.name = name;
        series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
        series.columns.template.width = am4core.percent(90);
        series.columns.template.column.fill = am4core.color(color);
        series.columns.template.column.stroke = am4core.color(color);
        var valueLabel = series.bullets.push(new am4charts.LabelBullet());
        valueLabel.label.text = "[#212529]{valueX}";
        spendDisOrder.maskBullets = false;
        valueLabel.label.dx = 4;
        valueLabel.label.horizontalCenter = "left";
        valueLabel.label.fontSize = 12;
        valueLabel.label.hideOversized = false;
        valueLabel.label.truncate = false;
        valueLabel.label.tooltipText = "{name}: [bold]{valueX}[/]";
        var cellSize = 75;
        spendDisOrder.events.on("datavalidated", function (ev) {
          var chart = ev.target;
          var categoryAxis = chart.yAxes.getIndex(0);
          var adjustHeight =
            chart.data.length * cellSize - categoryAxis.pixelHeight;
          var targetHeight = chart.pixelHeight + adjustHeight;
          chart.svgContainer.htmlElement.style.height = targetHeight + "px";
        });
        spendDisOrder.numberFormatter.numberFormat = "#.##a";
        spendDisOrder.numberFormatter.bigNumberPrefixes = [
          { number: 1e3, suffix: "K" },
          { number: 1e6, suffix: "M" },
          { number: 1e9, suffix: "B" },
        ];
      }
      createSeriesOrder("optimal", "optimal", "#d5e4e7");
      createSeriesOrder("base", "base", "#34C4E6");
    }
  }
  // QoQ graphs
  QoqYoyCommonGraph(graphName, graphData: any | undefined | null) {
    const QOQSpend = am4core.create(graphName, am4charts.XYChart);
    QOQSpend.data = graphData;
    QOQSpend.numberFormatter.numberFormat = "#.#a";
    QOQSpend.numberFormatter.bigNumberPrefixes = [
      { number: 1e3, suffix: "K" },
      { number: 1e6, suffix: "M" },
      { number: 1e9, suffix: "B" },
    ];
    var categoryAxis1 = QOQSpend.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis1.dataFields.category = "category";
    categoryAxis1.renderer.minGridDistance = 20;
    categoryAxis1.renderer.labels.template.__disabled = true;
    categoryAxis1.renderer.grid.template.disabled = true;
    var label1 = categoryAxis1.renderer.labels.template;
    label1.wrap = true;
    label1.maxWidth = 200;
    label1.fontSize = 11;
  label1.rotation = 0;
    label1.fill = am4core.color("#212529");
    var valueAxis = QOQSpend.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 0;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.extraMin = 0.00;
      valueAxis.extraMax = 1;
    valueAxis.events.on("sizechanged", function (ev) {
      const axis = ev.target;
      const cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
      axis.renderer.labels.template.maxWidth = cellWidth;
    });
    var columnSeries1 = QOQSpend.series.push(new am4charts.ColumnSeries());
    columnSeries1.dataFields.categoryY = "category";
    columnSeries1.dataFields.valueX = "value";
    columnSeries1.dataFields.openValueX = "open";
    columnSeries1.columns.template.width = 35;
    columnSeries1.columns.template.strokeOpacity = 0;
    columnSeries1.columns.template.propertyFields.fill = "color1";
    columnSeries1.columns.template.tooltipText =
      "{category}: [bold]{displayValue}[/]";
    var label = columnSeries1.columns.template.createChild(am4core.Label);
    label.align = "right";
    label.dx = 35;
    label.dy = 0;
    label.rotation = 0;
    label.text = "{displayValue}";
    label.fontSize = 11;
    label.fill = am4core.color("#212529");
  }
  // bucket attribution bucket graphs (order,spend,aquisition)
  bucketOrderCommonGraph(
    graphName,
    graphData: any | undefined | null,
    orderSpend
  ) {
    var chart = am4core.create(graphName, am4charts.XYChart);
    chart.data = graphData;
    chart.numberFormatter.numberFormat = "#.#a";
    chart.numberFormatter.bigNumberPrefixes = [
      { number: 1e3, suffix: "K" },
      { number: 1e6, suffix: "M" },
      { number: 1e9, suffix: "B" },
    ];
    chart.dateFormatter.inputDateFormat = "yyyy";
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.skipEmptyPeriods = true;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;
    dateAxis.paddingRight = 10;
    dateAxis.baseInterval = {
      timeUnit: "day",
      count: 1,
    };

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = false;
    valueAxis.renderer.grid.template.disabled = true;
    if (orderSpend === "order") {
        valueAxis.title.text = this.kpiValueSelected;
    } else {
      valueAxis.title.text = "Spend (AED)";
    }
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.name = "Social/Digital";
    series.dataFields.valueY = "Social/Digital";
    series.tooltipText = "[#212529]{valueY.value}[/] [#212529]{name}";
    series.tooltip.background.fill = am4core.color("#FFF");
    series.tooltip.getStrokeFromObject = true;
    series.tooltip.background.strokeWidth = 3;
    series.tooltip.getFillFromObject = false;
    series.fillOpacity = 0.6;
    series.strokeWidth = 2;
    series.stacked = true;
    series.stroke = am4core.color("#45c4ac");
    series.fill = am4core.color("#45c4ac");
    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "Mind Metrics";
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "Mind Metrics";
    series2.tooltipText = "[#212529]{valueY.value}[/] [#212529]{name}";
    series2.tooltip.background.fill = am4core.color("#FFF");
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.getStrokeFromObject = true;
    series2.tooltip.background.strokeWidth = 3;
    series2.sequencedInterpolation = true;
    series2.fillOpacity = 0.6;
    series2.stacked = true;
    series2.strokeWidth = 2;
    series2.stroke = am4core.color("#5c99d1");
    series2.fill = am4core.color("#5c99d1");
    // creating graph series Incentives
    var series3 = chart.series.push(new am4charts.LineSeries());
    series3.name = "Offers/Promotions";
    series3.dataFields.dateX = "date";
    series3.dataFields.valueY = "Offers/Promotions";
    series3.tooltipText = "[#212529]{valueY.value}[/] [#212529]{name}";
    series3.tooltip.background.fill = am4core.color("#FFF");
    series3.tooltip.getFillFromObject = false;
    series3.tooltip.getStrokeFromObject = true;
    series3.tooltip.background.strokeWidth = 3;
    series3.sequencedInterpolation = true;
    series3.fillOpacity = 0.6;
    series3.defaultState.transitionDuration = 1000;
    series3.stacked = true;
    series3.strokeWidth = 2;
    series3.stroke = am4core.color("#73d0e2");
    series3.fill = am4core.color("#73d0e2");
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
  }
  // bucket attribution channel graphs (order,spend,aquisition)
  bucketOrderChannelCommonGraph(
    graphName,
    graphData: any | undefined | null,
    orderSpend
  ) {
    const arrayOfSeries = this.channelArray;
    var chart = am4core.create(graphName, am4charts.XYChart);
    chart.data = graphData;
    chart.numberFormatter.numberFormat = "#.#a";
    chart.numberFormatter.bigNumberPrefixes = [
      { number: 1e3, suffix: "K" },
      { number: 1e6, suffix: "M" },
      { number: 1e9, suffix: "B" },
    ];
    chart.dateFormatter.inputDateFormat = "yyyy";

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.skipEmptyPeriods = true;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;
    dateAxis.paddingRight = 10;
    dateAxis.baseInterval = {
      timeUnit: "day",
      count: 1,
    };
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = false;
    valueAxis.renderer.grid.template.disabled = true;
    if (orderSpend === "order") {
      valueAxis.title.text = this.kpiValueSelected;
    } else {
      valueAxis.title.text = "Spend (AED)";
    }

    arrayOfSeries.forEach((element) => {
      var series3 = chart.series.push(new am4charts.LineSeries());
      series3.name = element;
      series3.dataFields.dateX = "date";
      series3.dataFields.valueY = element;
      series3.tooltipText = "[#212529]{valueY.value}[/] [#212529]{name}";
      series3.tooltip.background.fill = am4core.color("#FFF");
      series3.tooltip.getFillFromObject = false;
      series3.tooltip.getStrokeFromObject = true;
      series3.tooltip.background.strokeWidth = 3;
      series3.sequencedInterpolation = true;
      series3.fillOpacity = 0.6;
      series3.defaultState.transitionDuration = 1000;
      series3.stacked = true;
      series3.strokeWidth = 2;
    });
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
  }
  // downloadPPT
  downloadDetails() {
    this.spinner.activateSpinner();
    window.open(
      "https://mmm-stage.deliveryhero.net/Solution_Overview.pdf",
      "_blank"
    );
    this.spinner.deactivateSpinner();
  }
  // info bubble
  getTextSpendInfo(): string {
    var text =
      "Efficiency: Cost Per incremental Orders / Acquisitions." +
      "\n" +
      "Effectiveness:  Incremental Orders / Acquisitions attributed to channels";
    return text;
  }
  getTextChannels(): string {
    var text =
      "The chart contains channels with non-zero spends during the period." +
      "\n" +
      "Channels with zero contribution have non-significant effect in the model.";
    return text;
  }
}
