// core imports
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

// Third party imports
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

// Application imports
import { SpinnerServiceService } from 'src/app/services/spinner-service.service';
import { ScenarioComponent } from './scenario.component';
import { ScenarioService } from 'src/app/services/scenario.service';
import { environment } from 'src/environments/environment.prod';

describe('ScenarioComponent', () => {
  let component: ScenarioComponent;
  let fixture: ComponentFixture<ScenarioComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgxSpinnerModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [NgxSpinnerService, ScenarioService, SpinnerServiceService],
      declarations: [ScenarioComponent]
      ,
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Scenario Component executed successfully!', () => {
    expect(component).toBeTruthy();
  });

 
  it('ScenarioPlanner Post data and get result Scenario Data Executed Successfully!', () => {
    const service: ScenarioService = TestBed.get(ScenarioService);
    let object = {
      channel: "",
      quarter: "q3",
      month: "all",
      country: "FP-Thailand",
      year: "2020",
      metricOfInterest: "Orders",
      scenarioDetailsTable: [
        {
          additionalCost: ["55.6K", "15.8K", "5.6K", "316.5K", "304.1K", "109.2K", "114.8K"],
          channels: ["SP_CRM_RMO", "SP_OTH_CC_OTH_AUTOCOMP", "SP_OTHER", "SP_OTHER_SUBSIDIES", "SP_OTHER_VOUCHERS", "SP_Untracked_OTH_DEL_FEE", "SP_WOM_RAF"],
          customChange: [10, 10, 10, 10, 10, 10, 10],
          delta: "1.0M",
          totalBaseSpend: "10.1M",
          totalBaseSpendNum: 10137045,
          totalNewSpend: "11.2M",
          totalNewSpendNum: 11150749.5,
          type: "Incentives",
          typeTotalChange: 10,
          newSpend: [
            { valueK: "611.4K", valueNum: 611379 },
            { valueK: "173.5K", valueNum: 173466 },
            { valueK: "61.1K", valueNum: 61143 },
            { valueK: "3.5M", valueNum: 3481878 },
            { valueK: "3.3M", valueNum: 3344549 },
            { valueK: "1.2M", valueNum: 1201401 },
            { valueK: "1.3M", valueNum: 1263229 }
          ],
          baseSpend: [
            { valueK: "272.8K", valueNum: 272825.9614600001 },
            { valueK: "345.2K", valueNum: 345228.09073999984 },
            { valueK: "893.2K", valueNum: 893185.4453600005 },
            { valueK: "722.2K", valueNum: 722176.5824000003 },
            { valueK: "1.1M", valueNum: 1104974.9765599999 },
            { valueK: "529.2K", valueNum: 529156.3092400003 }
          ]

        },
        {
          additionalCost: ["27.3K", "34.5K", "89.3K", "72.2K", "110.5K", "52.9K"],
          channels: ["SP_CRM_RMO", "SP_OTH_CC_OTH_AUTOCOMP", "SP_OTHER", "SP_OTHER_SUBSIDIES", "SP_OTHER_VOUCHERS", "SP_Untracked_OTH_DEL_FEE", "SP_WOM_RAF"],
          customChange: [10, 10, 10, 10, 10, 10, 10],
          delta: "1.0M",
          totalBaseSpend: "10.1M",
          totalBaseSpendNum: 10137045,
          totalNewSpend: "11.2M",
          totalNewSpendNum: 11150749.5,
          type: "Incentives",
          typeTotalChange: 10,
          newSpend: [
            { valueK: "611.4K", valueNum: 611379 },
            { valueK: "173.5K", valueNum: 173466 },
            { valueK: "61.1K", valueNum: 61143 },
            { valueK: "3.5M", valueNum: 3481878 },
            { valueK: "3.3M", valueNum: 3344549 },
            { valueK: "1.2M", valueNum: 1201401 },
            { valueK: "1.3M", valueNum: 1263229 }
          ],
          baseSpend: [
            { valueK: "272.8K", valueNum: 272825.9614600001 },
            { valueK: "345.2K", valueNum: 345228.09073999984 },
            { valueK: "893.2K", valueNum: 893185.4453600005 },
            { valueK: "722.2K", valueNum: 722176.5824000003 },
            { valueK: "1.1M", valueNum: 1104974.9765599999 },
            { valueK: "529.2K", valueNum: 529156.3092400003 }
          ]
        },
        {
          additionalCost: ["47.0K", "26.2K", "113.1K", "26.9K", "25.8K", "15.8K", "3.9K", "8.5K"],
          channels: ["SP_CRM_RMO", "SP_OTH_CC_OTH_AUTOCOMP", "SP_OTHER", "SP_OTHER_SUBSIDIES", "SP_OTHER_VOUCHERS", "SP_Untracked_OTH_DEL_FEE", "SP_WOM_RAF"],
          customChange: [10, 10, 10, 10, 10, 10, 10],
          delta: "1.0M",
          totalBaseSpend: "10.1M",
          totalBaseSpendNum: 10137045,
          totalNewSpend: "11.2M",
          totalNewSpendNum: 11150749.5,
          type: "Incentives",
          typeTotalChange: 10,
          newSpend: [
            { valueK: "611.4K", valueNum: 611379 },
            { valueK: "173.5K", valueNum: 173466 },
            { valueK: "61.1K", valueNum: 61143 },
            { valueK: "3.5M", valueNum: 3481878 },
            { valueK: "3.3M", valueNum: 3344549 },
            { valueK: "1.2M", valueNum: 1201401 },
            { valueK: "1.3M", valueNum: 1263229 }
          ],
          baseSpend: [
            { valueK: "272.8K", valueNum: 272825.9614600001 },
            { valueK: "345.2K", valueNum: 345228.09073999984 },
            { valueK: "893.2K", valueNum: 893185.4453600005 },
            { valueK: "722.2K", valueNum: 722176.5824000003 },
            { valueK: "1.1M", valueNum: 1104974.9765599999 },
            { valueK: "529.2K", valueNum: 529156.3092400003 }
          ]
        }
      ],
      specificTypeChange: [{ customChange: "-75", basespend: "10.1M", type: "Incentives" }],
      changeInSpend: 10,

    }
    service.postRoute(object);
    expect(service).toBeTruthy();
  });

  it('ScenarioPlanner details Post data and get result Scenario Data Executed Successfully!', () => {
    const service: ScenarioService = TestBed.get(ScenarioService);
    let object = {
      channel: "",
      totalBaseSpend: "23k",
      totalNewSpend: "45k",
      channelBaseSpend: "34",
      rangeBarValue: "34",
      scenarioDetailsTable: [
        {
          additionalCost: ["55.6K", "15.8K", "5.6K", "316.5K", "304.1K", "109.2K", "114.8K"],
          channels: ["SP_CRM_RMO", "SP_OTH_CC_OTH_AUTOCOMP", "SP_OTHER", "SP_OTHER_SUBSIDIES", "SP_OTHER_VOUCHERS", "SP_Untracked_OTH_DEL_FEE", "SP_WOM_RAF"],
          customChange: [10, 10, 10, 10, 10, 10, 10],
          delta: "1.0M",
          totalBaseSpend: "10.1M",
          totalBaseSpendNum: 10137045,
          totalNewSpend: "11.2M",
          totalNewSpendNum: 11150749.5,
          type: "Incentives",
          typeTotalChange: 10,
          newSpend: [
            { valueK: "611.4K", valueNum: 611379 },
            { valueK: "173.5K", valueNum: 173466 },
            { valueK: "61.1K", valueNum: 61143 },
            { valueK: "3.5M", valueNum: 3481878 },
            { valueK: "3.3M", valueNum: 3344549 },
            { valueK: "1.2M", valueNum: 1201401 },
            { valueK: "1.3M", valueNum: 1263229 }
          ],
          baseSpend: [
            { valueK: "272.8K", valueNum: 272825.9614600001 },
            { valueK: "345.2K", valueNum: 345228.09073999984 },
            { valueK: "893.2K", valueNum: 893185.4453600005 },
            { valueK: "722.2K", valueNum: 722176.5824000003 },
            { valueK: "1.1M", valueNum: 1104974.9765599999 },
            { valueK: "529.2K", valueNum: 529156.3092400003 }
          ]

        },
        {
          additionalCost: ["27.3K", "34.5K", "89.3K", "72.2K", "110.5K", "52.9K"],
          channels: ["SP_CRM_RMO", "SP_OTH_CC_OTH_AUTOCOMP", "SP_OTHER", "SP_OTHER_SUBSIDIES", "SP_OTHER_VOUCHERS", "SP_Untracked_OTH_DEL_FEE", "SP_WOM_RAF"],
          customChange: [10, 10, 10, 10, 10, 10, 10],
          delta: "1.0M",
          totalBaseSpend: "10.1M",
          totalBaseSpendNum: 10137045,
          totalNewSpend: "11.2M",
          totalNewSpendNum: 11150749.5,
          type: "Incentives",
          typeTotalChange: 10,
          newSpend: [
            { valueK: "611.4K", valueNum: 611379 },
            { valueK: "173.5K", valueNum: 173466 },
            { valueK: "61.1K", valueNum: 61143 },
            { valueK: "3.5M", valueNum: 3481878 },
            { valueK: "3.3M", valueNum: 3344549 },
            { valueK: "1.2M", valueNum: 1201401 },
            { valueK: "1.3M", valueNum: 1263229 }
          ],
          baseSpend: [
            { valueK: "272.8K", valueNum: 272825.9614600001 },
            { valueK: "345.2K", valueNum: 345228.09073999984 },
            { valueK: "893.2K", valueNum: 893185.4453600005 },
            { valueK: "722.2K", valueNum: 722176.5824000003 },
            { valueK: "1.1M", valueNum: 1104974.9765599999 },
            { valueK: "529.2K", valueNum: 529156.3092400003 }
          ]
        },
        {
          additionalCost: ["47.0K", "26.2K", "113.1K", "26.9K", "25.8K", "15.8K", "3.9K", "8.5K"],
          channels: ["SP_CRM_RMO", "SP_OTH_CC_OTH_AUTOCOMP", "SP_OTHER", "SP_OTHER_SUBSIDIES", "SP_OTHER_VOUCHERS", "SP_Untracked_OTH_DEL_FEE", "SP_WOM_RAF"],
          customChange: [10, 10, 10, 10, 10, 10, 10],
          delta: "1.0M",
          totalBaseSpend: "10.1M",
          totalBaseSpendNum: 10137045,
          totalNewSpend: "11.2M",
          totalNewSpendNum: 11150749.5,
          type: "Incentives",
          typeTotalChange: 10,
          newSpend: [
            { valueK: "611.4K", valueNum: 611379 },
            { valueK: "173.5K", valueNum: 173466 },
            { valueK: "61.1K", valueNum: 61143 },
            { valueK: "3.5M", valueNum: 3481878 },
            { valueK: "3.3M", valueNum: 3344549 },
            { valueK: "1.2M", valueNum: 1201401 },
            { valueK: "1.3M", valueNum: 1263229 }
          ],
          baseSpend: [
            { valueK: "272.8K", valueNum: 272825.9614600001 },
            { valueK: "345.2K", valueNum: 345228.09073999984 },
            { valueK: "893.2K", valueNum: 893185.4453600005 },
            { valueK: "722.2K", valueNum: 722176.5824000003 },
            { valueK: "1.1M", valueNum: 1104974.9765599999 },
            { valueK: "529.2K", valueNum: 529156.3092400003 }
          ]
        }
      ],
      scenarioListData: [{ customChange: "-75", basespend: "10.1M", type: "Incentives" }],
      type: 'incentives',
      index:'1'

    }
    service.postRouteDetails(object);
    expect(service).toBeTruthy();
  });


  
  it('ScenarioPlanner details Post data and get result Scenario Data Executed Successfully!', () => {
    const service: ScenarioService = TestBed.get(ScenarioService);
    let object = {
    
      scenarioDetailsTable: [
        {
          additionalCost: ["55.6K", "15.8K", "5.6K", "316.5K", "304.1K", "109.2K", "114.8K"],
          channels: ["SP_CRM_RMO", "SP_OTH_CC_OTH_AUTOCOMP", "SP_OTHER", "SP_OTHER_SUBSIDIES", "SP_OTHER_VOUCHERS", "SP_Untracked_OTH_DEL_FEE", "SP_WOM_RAF"],
          customChange: [10, 10, 10, 10, 10, 10, 10],
          delta: "1.0M",
          totalBaseSpend: "10.1M",
          totalBaseSpendNum: 10137045,
          totalNewSpend: "11.2M",
          totalNewSpendNum: 11150749.5,
          type: "Incentives",
          typeTotalChange: 10,
          newSpend: [
            { valueK: "611.4K", valueNum: 611379 },
            { valueK: "173.5K", valueNum: 173466 },
            { valueK: "61.1K", valueNum: 61143 },
            { valueK: "3.5M", valueNum: 3481878 },
            { valueK: "3.3M", valueNum: 3344549 },
            { valueK: "1.2M", valueNum: 1201401 },
            { valueK: "1.3M", valueNum: 1263229 }
          ],
          baseSpend: [
            { valueK: "272.8K", valueNum: 272825.9614600001 },
            { valueK: "345.2K", valueNum: 345228.09073999984 },
            { valueK: "893.2K", valueNum: 893185.4453600005 },
            { valueK: "722.2K", valueNum: 722176.5824000003 },
            { valueK: "1.1M", valueNum: 1104974.9765599999 },
            { valueK: "529.2K", valueNum: 529156.3092400003 }
          ]

        },
        {
          additionalCost: ["27.3K", "34.5K", "89.3K", "72.2K", "110.5K", "52.9K"],
          channels: ["SP_CRM_RMO", "SP_OTH_CC_OTH_AUTOCOMP", "SP_OTHER", "SP_OTHER_SUBSIDIES", "SP_OTHER_VOUCHERS", "SP_Untracked_OTH_DEL_FEE", "SP_WOM_RAF"],
          customChange: [10, 10, 10, 10, 10, 10, 10],
          delta: "1.0M",
          totalBaseSpend: "10.1M",
          totalBaseSpendNum: 10137045,
          totalNewSpend: "11.2M",
          totalNewSpendNum: 11150749.5,
          type: "Incentives",
          typeTotalChange: 10,
          newSpend: [
            { valueK: "611.4K", valueNum: 611379 },
            { valueK: "173.5K", valueNum: 173466 },
            { valueK: "61.1K", valueNum: 61143 },
            { valueK: "3.5M", valueNum: 3481878 },
            { valueK: "3.3M", valueNum: 3344549 },
            { valueK: "1.2M", valueNum: 1201401 },
            { valueK: "1.3M", valueNum: 1263229 }
          ],
          baseSpend: [
            { valueK: "272.8K", valueNum: 272825.9614600001 },
            { valueK: "345.2K", valueNum: 345228.09073999984 },
            { valueK: "893.2K", valueNum: 893185.4453600005 },
            { valueK: "722.2K", valueNum: 722176.5824000003 },
            { valueK: "1.1M", valueNum: 1104974.9765599999 },
            { valueK: "529.2K", valueNum: 529156.3092400003 }
          ]
        },
        {
          additionalCost: ["47.0K", "26.2K", "113.1K", "26.9K", "25.8K", "15.8K", "3.9K", "8.5K"],
          channels: ["SP_CRM_RMO", "SP_OTH_CC_OTH_AUTOCOMP", "SP_OTHER", "SP_OTHER_SUBSIDIES", "SP_OTHER_VOUCHERS", "SP_Untracked_OTH_DEL_FEE", "SP_WOM_RAF"],
          customChange: [10, 10, 10, 10, 10, 10, 10],
          delta: "1.0M",
          totalBaseSpend: "10.1M",
          totalBaseSpendNum: 10137045,
          totalNewSpend: "11.2M",
          totalNewSpendNum: 11150749.5,
          type: "Incentives",
          typeTotalChange: 10,
          newSpend: [
            { valueK: "611.4K", valueNum: 611379 },
            { valueK: "173.5K", valueNum: 173466 },
            { valueK: "61.1K", valueNum: 61143 },
            { valueK: "3.5M", valueNum: 3481878 },
            { valueK: "3.3M", valueNum: 3344549 },
            { valueK: "1.2M", valueNum: 1201401 },
            { valueK: "1.3M", valueNum: 1263229 }
          ],
          baseSpend: [
            { valueK: "272.8K", valueNum: 272825.9614600001 },
            { valueK: "345.2K", valueNum: 345228.09073999984 },
            { valueK: "893.2K", valueNum: 893185.4453600005 },
            { valueK: "722.2K", valueNum: 722176.5824000003 },
            { valueK: "1.1M", valueNum: 1104974.9765599999 },
            { valueK: "529.2K", valueNum: 529156.3092400003 }
          ]
        }
      ],
      

    }
    service.downloadResult(object);
    expect(service).toBeTruthy();
  });

});
