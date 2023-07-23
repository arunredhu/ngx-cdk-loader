import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxLoaderHttpInterceptor } from './services';
import { NgxCdkLoaderDirective } from './directives';
import { NGX_CDK_LOADER_CONFIG, defaultNgxCdkLoaderConfig } from './configs';
import { NgxCdkLoaderConfig } from './models';

@NgModule({
  declarations: [NgxCdkLoaderDirective],
  imports: [HttpClientModule],
  exports: [NgxCdkLoaderDirective],
  providers: [],
})
export class NgxCdkLoaderModule {
  static forRoot(
    config: Partial<NgxCdkLoaderConfig> = {}
  ): ModuleWithProviders<NgxCdkLoaderModule> {
    return {
      ngModule: NgxCdkLoaderModule,
      providers: [
        {
          provide: NGX_CDK_LOADER_CONFIG,
          useValue: {
            ...defaultNgxCdkLoaderConfig,
            ...config,
          },
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: NgxLoaderHttpInterceptor,
          multi: true,
        },
      ],
    };
  }
}
