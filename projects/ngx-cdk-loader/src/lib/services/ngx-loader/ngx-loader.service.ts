import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgxLoaderService {
  private get isLoading() {
    return this.isLoading$.getValue();
  }

  loading$: Observable<boolean>;

  private isLoading$ = new BehaviorSubject(false);

  constructor() {
    this.loading$ = this.isLoading$.asObservable().pipe(shareReplay(1));
  }

  showLoader() {
    if (!this.isLoading) {
      this.isLoading$.next(true);
    }
  }

  hideLoader() {
    if (this.isLoading) {
      this.isLoading$.next(false);
    }
  }
}
