import { InjectionToken } from '@angular/core';

import { NgxCdkLoaderConfig } from '../models';

/** Default config for Ngx Loader */
export const defaultNgxCdkLoaderConfig: NgxCdkLoaderConfig = {
  /** Default timeout for loader is 10 Seconds */
  loadingTimeout: 10000,
};

/** Injection token for config. Ngx Loader config will be provided on this injection token */
export const NGX_CDK_LOADER_CONFIG = new InjectionToken(
  'NGX_CDK_LOADER_CONFIG'
);
