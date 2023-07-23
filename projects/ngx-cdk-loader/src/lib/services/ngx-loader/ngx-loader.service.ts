import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgxLoaderService {
  loading$: Observable<boolean>;

  private isLoading$ = new BehaviorSubject(false);

  constructor() {
    this.loading$ = this.isLoading$.asObservable().pipe(shareReplay(1));
  }

  showLoader() {
    this.isLoading$.next(true);
  }

  hideLoader() {
    this.isLoading$.next(false);
  }
}
