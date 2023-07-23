import { TestBed } from '@angular/core/testing';

import { NgxLoaderHttpInterceptor } from './ngx-loader-http-interceptor.service';

describe('NgxLoaderHttpInterceptorService', () => {
  let service: NgxLoaderHttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxLoaderHttpInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
