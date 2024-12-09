// Core imports
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Application imports
import { AuthenticateRouteGuard } from './authenticate-route.guard';

describe('AuthenticateRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [AuthenticateRouteGuard]
    });
  });

  it('Auth Guard created', inject([AuthenticateRouteGuard], (guard: AuthenticateRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
