import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { NgxLoaderService } from '../ngx-loader/ngx-loader.service';
import { NGX_CDK_LOADER_CONFIG } from '../../configs';
import { NgxCdkLoaderConfig } from '../../models';

/**
 * @class
 * @name NgxLoaderHttpInterceptor
 * @description This is a http interceptor class to manage the loading state based on http request.
 * @implements HttpInterceptor
 */
@Injectable({
  providedIn: 'root',
})
export class NgxLoaderHttpInterceptor implements HttpInterceptor {
  /** Maintain the list of pending requests which are not completed */
  private requests: HttpRequest<any>[] = [];

  /** Reference to timer */
  private timer: any;

  /**
   * @constructor
   * @param ngxLoaderService {NgxLoaderService} Loader service for maintaining the state of loading
   * @param loaderConfig {NgxCdkLoaderConfig} Loader config
   */
  constructor(
    private ngxLoaderService: NgxLoaderService,
    @Inject(NGX_CDK_LOADER_CONFIG) private loaderConfig: NgxCdkLoaderConfig
  ) {}

  /**
   * @method
   * @name intercept
   * @description
   * This is http Interceptor which gets called each time API call is invoked
   * This performs middleware checks
   * @param req Request
   * @param next HttpHandler
   * @returns Observable
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /** Reading the supress header property in the request if it is explicitly set */
    const supressLoader = req.headers.get('x-ngx-cdk-loader-supress');

    let headers = req.headers;

    /** Delete the additional header which was used to supress the loader */
    if (req.headers.has('x-ngx-cdk-loader-supress')) {
      headers = req?.headers?.delete('x-ngx-cdk-loader-supress');
    }

    /** Clone the request so that additional things can be added or removed */
    let updatedRequest = req.clone({ headers });

    /** If supress loader property is set for this request, then excape the rest of the things and send the request to the next handler */
    if (supressLoader?.toString().toLowerCase() === 'true') {
      return next.handle(updatedRequest);
    }

    /** Add the request to the pending list */
    this.requests.push(updatedRequest);

    /** Show the loader */
    this.ngxLoaderService.showLoader();

    /** Initilize the timeout */
    this.handleTimeout();

    /** returns the new observable for the request */
    return new Observable((observer) => {
      const subscription = next.handle(updatedRequest).subscribe(
        (event) => {
          /** Listen for HttpResponse event and remove the request from the pending list */
          if (event instanceof HttpResponse) {
            this.removeRequest(updatedRequest);
            observer.next(event);
          }
        },
        (err) => {
          /** In case of error, remove the request from the pending list */
          this.removeRequest(updatedRequest);
          observer.error(err);
        },
        () => {
          /** In case of request complete, remove the request from the pending list */
          this.removeRequest(updatedRequest);
          observer.complete();
        }
      );

      /** Remove request from queue when cancelled */
      return () => {
        this.removeRequest(updatedRequest);
        subscription.unsubscribe();
      };
    });
  }

  /**
   * @method
   * @name removeRequest
   * @description This method will remove the input request from the pending request list. After removing the request it will check if list still have pending requests or not,
   * If list have pending request, then the loader will be shown again else if will hide the loader
   * @param req {HttpRequest<any>} HttpRequest Object
   * @returns
   */
  private removeRequest(req: HttpRequest<any>) {
    /** Remove the request from the list */
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    /** Check for pending request list and show/hide loader */
    if (this.requests.length > 0) {
      this.ngxLoaderService.showLoader();
    } else {
      this.ngxLoaderService.hideLoader();
    }
  }

  /**
   * @method
   * @name handleTimeout
   * @description This method set the timer for the request. Upon each new request the timer will be reset and again set for the time.
   * The time for timer is used from the configurations. In any case, if loader is still visible, then after a timeout, loader will be hidden.
   */
  private handleTimeout() {
    /** Clear the previous timer */
    if (this.timer) {
      window.clearTimeout(this.timer);
    }

    /** Set the new timer */
    this.timer = setTimeout(() => {
      this.ngxLoaderService.hideLoader();
    }, this.loaderConfig.loadingTimeout);
  }
}
