import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';

/**
 * @class
 * @name NgxLoaderService
 * @description This is the loader service. This manages the state of the loader i.e. loader is shown of hidden.
 * This service provides the methods to control the state of loader.
 */
@Injectable({
  providedIn: 'root',
})
export class NgxLoaderService {
  /** isLoading snapshot of the behavior value */
  private get isLoading() {
    return this.isLoading$.getValue();
  }

  /** Loading observable which emits a value when loader state changes. */
  loading$: Observable<boolean>;

  /** Behaviour subject to handle the loader state */
  private isLoading$ = new BehaviorSubject(false);

  /**
   * @constructor
   */
  constructor() {
    /** Convert behavior subject to observable output */
    this.loading$ = this.isLoading$.asObservable().pipe(shareReplay(1));
  }

  /**
   * @method
   * @name showLoader
   * @description This methods check the loading state and set the loader state to true
   * @returns
   */
  showLoader() {
    if (!this.isLoading) {
      this.isLoading$.next(true);
    }
  }

  /**
   * @method
   * @name hideLoader
   * @description This methods check the loading state and set the loader state to false
   * @returns
   */
  hideLoader() {
    if (this.isLoading) {
      this.isLoading$.next(false);
    }
  }
}
