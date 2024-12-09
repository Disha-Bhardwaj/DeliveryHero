// Core imports
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Third party imports
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

// Application imports
import { OptimizerService } from './optimizer.service';

describe('OptimizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      HttpClientModule,
      HttpClientTestingModule
  ],
  }));

  it('Optimizer Service Created Successfully', () => {
    const service: OptimizerService = TestBed.get(OptimizerService);
    expect(service).toBeTruthy();
  });
});
