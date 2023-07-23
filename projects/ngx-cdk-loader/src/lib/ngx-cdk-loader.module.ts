import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxLoaderHttpInterceptor } from './services';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgxLoaderHttpInterceptor,
      multi: true,
    },
  ],
})
export class NgxCdkLoaderModule {}
