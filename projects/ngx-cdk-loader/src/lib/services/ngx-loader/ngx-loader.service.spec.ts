import { TestBed } from '@angular/core/testing';

import { NgxLoaderService } from './ngx-loader.service';

describe('NgxLoaderService', () => {
  let service: NgxLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
