import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCdkLoaderComponent } from './ngx-cdk-loader.component';

describe('NgxCdkLoaderComponent', () => {
  let component: NgxCdkLoaderComponent;
  let fixture: ComponentFixture<NgxCdkLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxCdkLoaderComponent]
    });
    fixture = TestBed.createComponent(NgxCdkLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
