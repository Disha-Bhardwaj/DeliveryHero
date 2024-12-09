// Core imports
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Third party imports
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

// Application imports
import { ScenarioService } from './scenario.service';

describe('SpinnerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  // it('should be created', () => {
  //   const service: SpinnerServiceService = TestBed.get(SpinnerServiceService);
  //   expect(service).toBeTruthy();
  // });
});
