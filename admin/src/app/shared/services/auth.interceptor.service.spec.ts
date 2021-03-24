import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { AuthInterceptor } from './auth.interceptor.service';

describe('AuthInterceptor', () => {
  let service: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [AuthInterceptor, Injector],
    });
    service = TestBed.inject(AuthInterceptor);
  });

  it('Testa instancia de AuthInterceptor', () => {
    expect(service).toBeTruthy();
  });
});
