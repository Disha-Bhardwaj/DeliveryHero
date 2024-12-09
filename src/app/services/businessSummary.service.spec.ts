// core imports
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Third party imports
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

// Application imports
import { BusinessSummaryService } from './businessSummary.service';

describe('BusinessSummaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule

    ],
    providers: [BusinessSummaryService]
  }));

  it('Test Case business Summary Initial Route', () => {
    const service: BusinessSummaryService = TestBed.get(BusinessSummaryService);
    // service.initialRoute();
    expect(service).toBeTruthy();
  });

  it('Business Summary Component Created Successfully', () => {
    const service: BusinessSummaryService = TestBed.get(BusinessSummaryService);
     expect(service).toBeTruthy();
  });

  

  
});
