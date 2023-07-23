import { TestBed } from '@angular/core/testing';

import { NgxCdkLoaderService } from './ngx-cdk-loader.service';

describe('NgxCdkLoaderService', () => {
  let service: NgxCdkLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCdkLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
