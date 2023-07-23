import { NgModule } from '@angular/core';
import { NgxCdkLoaderComponent } from './ngx-cdk-loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxLoaderHttpInterceptor } from './services';

@NgModule({
  declarations: [NgxCdkLoaderComponent],
  imports: [],
  exports: [NgxCdkLoaderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgxLoaderHttpInterceptor,
      multi: true,
    },
  ],
})
export class NgxCdkLoaderModule {}
