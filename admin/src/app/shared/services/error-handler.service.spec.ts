import { TestBed } from '@angular/core/testing';

import { ApplicationErrorHandler } from './error-handler.service';
import { AppModule } from 'src/app/app.module';
import { Injector } from '@angular/core';

describe('ApplicationErrorHandler', () => {
  let service: ApplicationErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [ApplicationErrorHandler, Injector],
    });
    service = TestBed.inject(ApplicationErrorHandler);
  });

  it('Testa instancia de ApplicationErrorHandler', () => {
    expect(service).toBeTruthy();
  });
});
