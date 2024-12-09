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
import { AuthServiceService } from './auth-service.service';

describe('AuthServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    imports:
    [
      CommonModule,
      NgxSpinnerModule,
      HttpClientModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      
      RouterTestingModule
      

    ],
    providers: [NgxSpinnerService]
    
  }));

  it('Auth Service Created Successfully1', () => {
    const service: AuthServiceService = TestBed.get(AuthServiceService);
    expect(service).toBeTruthy();
  });
});
