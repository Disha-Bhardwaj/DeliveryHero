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
import { ScenarioService } from './scenario.service';

describe('ScenarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      HttpClientModule,
      HttpClientTestingModule
  ],
  }));

  it('Scenario service executed properly', () => {
    const service: ScenarioService = TestBed.get(ScenarioService);
    expect(service).toBeTruthy();
  });
});
