import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { NgxLoaderService } from '../ngx-loader/ngx-loader.service';

@Injectable({
  providedIn: 'root',
})
export class NgxLoaderHttpInterceptor implements HttpInterceptor {
  private totalRequestsCount = 0;
  private requests: HttpRequest<any>[] = [];
  private timer: any;

  constructor(private ngxLoaderService: NgxLoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const supressLoader = req.headers.get('x-supress-ngx-loader');

    /** Delete the additional header which was used to supress the loader */
    if (req.headers.has('x-supress-ngx-loader')) {
      req?.headers?.delete('x-supress-ngx-loader');
    }

    if (supressLoader?.toString().toLowerCase() === 'true') {
      return next.handle(req);
    }

    this.totalRequestsCount = this.totalRequestsCount + 1;
    this.requests.push(req);
    this.ngxLoaderService.showLoader();
    this.handleTimeout();

    return new Observable((observer) => {
      const subscription = next.handle(req).subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        (err) => {
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);
          observer.complete();
        }
      );
      /**
       * Remove request from queue when cancelled
       */
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }

  private removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    if (this.requests.length > 0) {
      this.ngxLoaderService.showLoader();
    } else {
      this.ngxLoaderService.hideLoader();
    }
  }

  private handleTimeout() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.ngxLoaderService.hideLoader();
    }, 10000);
  }
}
