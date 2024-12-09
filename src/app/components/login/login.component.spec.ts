// Core imports
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Third party imports
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

// Application imports
import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/services/login.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports:
      [
        NgxSpinnerModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        HttpClientTestingModule,
        RouterTestingModule

      ],
      providers: [NgxSpinnerService,LoginService],
      declarations: [ LoginComponent ]
      ,
      schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Login Component Executed Successfully!', () => {
    expect(component).toBeTruthy();
  });


});
