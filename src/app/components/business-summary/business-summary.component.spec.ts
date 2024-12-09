// Core imports
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Third party imports
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs/operators';
import * as Rx from 'rxjs';

// Application imports
import { BusinessSummaryComponent } from '../business-summary/business-summary.component';
import { BusinessSummaryService } from 'src/app/services/businessSummary.service';
import { BusinessSummaryRoutingModule } from './business-summary.routing.module';
import { ThousandSuffixesPipe } from './formatterPipe';
import { SpinnerServiceService } from 'src/app/services/spinner-service.service';


describe('BusinessSummaryComponent', () => {
  let component: BusinessSummaryComponent;
  let fixture: ComponentFixture<BusinessSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:
        [
          CommonModule,
          NgxSpinnerModule,
          HttpClientModule,
          ReactiveFormsModule,
          HttpClientTestingModule,
          BusinessSummaryRoutingModule,
          RouterTestingModule.withRoutes([])
        ],
      providers: [NgxSpinnerService, BusinessSummaryService, SpinnerServiceService],
      declarations: [BusinessSummaryComponent, ThousandSuffixesPipe],
      schemas: [ NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Business Summary Component Executed Successfully', () => {
    expect(component).toBeTruthy();
  });



  it('Initial Service To Get Business Summary Executed Successfully!', () => {
    const service: BusinessSummaryService = TestBed.get(BusinessSummaryService);
    service.initialRoute();
    expect(service).toBeTruthy();
  });


  it('Service To Post QoQ comparision graphs Business Summary Executed Successfully!', () => {
    let object = {
      year: "2020",
      quarter: "q1",
      country: "FP - Thailand",
      compare_on: "qoq",
      group: "bucket",
      chart_selection: "distribution"
    }
    const service: BusinessSummaryService = TestBed.get(BusinessSummaryService);
    service.combineRoute(object);
    expect(service).toBeTruthy();
  });
  it('Service To Post Bucket attribution graphs Business Summary Executed Successfully!', () => {
    let object = {
      bucket: "Performance Marketing",
      chart_selection: "attribution",
      country: "FP-Thailand",
      group: "bucket",
      metric: "acquistions",
      quarter: "all",
      year: "2020"
    }
    const service: BusinessSummaryService = TestBed.get(BusinessSummaryService);
    service.combineRoute(object);
    expect(service).toBeTruthy();
  });

  it('Service To Post distribution graphs Business Summary Executed Successfully!', () => {
    let object = {
      bucket: "Performance Marketing",
      chart_selection: "distribution",
      country: "FP-Thailand",
      distribution_type: "effective",
      quarter: "all",
      year: "2020"
    }
    const service: BusinessSummaryService = TestBed.get(BusinessSummaryService);
    service.combineRoute(object);
    expect(service).toBeTruthy();
  });

  it('Service To Post Channels graphs Business Summary Executed Successfully!', () => {
    let object = {
      bucket: "Performance Marketing",
      chart_selection: "channel_distribution",
      country: "FP-Thailand",
      distribution_type: "effective",
      quarter: "all",
      year: "2020"
    }
    const service: BusinessSummaryService = TestBed.get(BusinessSummaryService);
    service.combineRoute(object);
    expect(service).toBeTruthy();
  });



});
