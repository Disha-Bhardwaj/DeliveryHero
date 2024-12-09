// Core imports
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

// Third party imports
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs/operators';
import * as Rx from 'rxjs';

// Application imports
import { LeftPanelComponent } from './left-panel.component';
import { BusinessSummaryRoutingModule } from '../business-summary/business-summary.routing.module';
import { OptimizerService } from 'src/app/services/optimizer.service';
import { OptimizerRoutingModule } from '../optimizer-module/optimizer.routing.module';
import { SpinnerServiceService } from 'src/app/services/spinner-service.service';

describe('LeftPanelComponent', () => {
  let component: LeftPanelComponent;
  let fixture: ComponentFixture<LeftPanelComponent>;

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
      declarations: [ LeftPanelComponent ],
      schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
