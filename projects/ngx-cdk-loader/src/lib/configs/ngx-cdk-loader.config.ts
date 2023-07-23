import { InjectionToken } from '@angular/core';

import { NgxCdkLoaderConfig } from '../models';

export const defaultNgxCdkLoaderConfig: NgxCdkLoaderConfig = {
  /** Default timeout for loader is 10 Seconds */
  loadingTimeout: 10000,
};

export const NGX_CDK_LOADER_CONFIG = new InjectionToken(
  'NGX_CDK_LOADER_CONFIG'
);
