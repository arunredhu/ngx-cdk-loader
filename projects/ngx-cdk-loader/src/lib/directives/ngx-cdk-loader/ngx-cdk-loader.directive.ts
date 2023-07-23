import {
  AfterViewInit,
  Directive,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { NgxLoaderService } from '../../services/';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ngxCdkLoader]',
})
export class NgxCdkLoaderDirective implements AfterViewInit, OnDestroy {
  private readonly subs: Subscription = new Subscription();

  constructor(
    private readonly view: ViewContainerRef,
    private readonly template: TemplateRef<any>,
    private readonly ngxLoaderService: NgxLoaderService
  ) {}

  ngAfterViewInit(): void {
    this.handleLoaderVisibility();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private handleLoaderVisibility() {
    this.subs.add(
      this.ngxLoaderService.loading$.subscribe({
        next: (loading) => {
          if (!loading) {
            this.view.clear();
          } else {
            this.view.createEmbeddedView(this.template);
          }
        },
      })
    );
  }
}
