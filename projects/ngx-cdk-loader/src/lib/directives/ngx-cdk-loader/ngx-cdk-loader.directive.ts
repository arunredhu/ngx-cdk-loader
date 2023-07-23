import {
  AfterViewInit,
  Directive,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { NgxLoaderService } from '../../services/';
import { Subscription } from 'rxjs';

/**
 * @class
 * @type Directive
 * @name NgxCdkLoaderDirective
 * @description This is the structural directive. This directive should be applied to loader element.
 * This will automatically hide and show the loader element based on the loading state.
 * @implements AfterViewInit, OnDestroy
 */
@Directive({
  selector: '[ngxCdkLoader]',
})
export class NgxCdkLoaderDirective implements AfterViewInit, OnDestroy {
  /** Contains the subscriptions */
  private readonly subs: Subscription = new Subscription();

  /**
   * @constructor
   * @param view ViewContainerRef
   * @param template TemplateRef
   * @param ngxLoaderService NgxLoaderService
   */
  constructor(
    private readonly view: ViewContainerRef,
    private readonly template: TemplateRef<any>,
    private readonly ngxLoaderService: NgxLoaderService
  ) {}

  /** Afterviewinit lifecycle hook */
  ngAfterViewInit(): void {
    this.handleLoaderVisibility();
  }

  /** OnDestroy lifecycle hook */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * @method
   * @name handleLoaderVisibility
   * @description This method subscribe the loading state and based on state, it renders the element.
   */
  private handleLoaderVisibility() {
    this.subs.add(
      this.ngxLoaderService.loading$.subscribe({
        next: (loading) => {
          /** In case of not loading, the loader element should be hidden */
          if (!loading) {
            this.view.clear();
          } else {
            /** In case of loading, the loader element should be hidden */
            this.view.createEmbeddedView(this.template);
          }
        },
      })
    );
  }
}
