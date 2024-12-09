// Core imports
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Third party imports
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs/operators';
import * as Rx from 'rxjs';

// Application imports
import { BusinessSummaryRoutingModule } from '../business-summary/business-summary.routing.module';
import { OptimizerService } from 'src/app/services/optimizer.service';
import { OptimizerRoutingModule } from '../optimizer-module/optimizer.routing.module';
import { OptimizerComponent } from './optimizer.component';
import { SpinnerServiceService } from 'src/app/services/spinner-service.service';

describe('OptimizerComponent', () => {
  let component: OptimizerComponent;
  let fixture: ComponentFixture<OptimizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:
      [
        CommonModule,
        NgxSpinnerModule,
        HttpClientModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        OptimizerRoutingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule
      ],
      providers: [NgxSpinnerService,OptimizerService, SpinnerServiceService],
      declarations: [ OptimizerComponent ],
      
    schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Optimizer Component Executed Successfully', () => {
    expect(component).toBeTruthy();
  });


  it('Initial Service To Get Optimizer Workbench Executed Successfully!', () => {
    const service: OptimizerService = TestBed.get(OptimizerService);
    let object = {
      year: "2020",
      country: "FP-Thailand",
      quarter: "q3",
      month: "all",
      maximization: "order",
      enterPlannedSpend: "20.0M"
    }

    service.initialRouteOptimizerWorkbench(object);
    expect(service).toBeTruthy();
  });


  it('Service To Post optimizer tool recommendation Executed Successfully!', () => {
    let object= {
      year: "2020",
      quarter: "q1",
      country: "FP - Thailand",
      planned: 10,
      maximization: "order",
      userPerformance: '36',
      userTopOfMind: '23',
      userIncentive: '10'
    }
    const service: OptimizerService = TestBed.get(OptimizerService);
    service.postRouteOptimizerTool(object);
    expect(service).toBeTruthy();
  });

  it('Service To Post optimizer Workbench result Executed Successfully!', () => {
    let object= {
      year: "2020",
      quarter: "q1",
      country: "FP - Thailand",
      planned: 10,
      maximization: "order",
      lowerLimitWorkbench: [],
      upperLimitWorkbench: [],
      customizedLimitWorkbench: [],
      optimizerWorkBench: [],
      optiToolRecom: [],
      optiToolRecomUser: [],
      plannedToolRecom: "20",
      baseAquiToolRecom: "20K",
      baseOrderToolRecom: "20M"
    }
    const service: OptimizerService = TestBed.get(OptimizerService);
    service.postRouteworkbenchResult(object);
    expect(service).toBeTruthy();
  });

});

