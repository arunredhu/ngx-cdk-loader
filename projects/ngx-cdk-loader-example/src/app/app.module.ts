import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { NgxCdkLoaderModule } from 'ngx-cdk-loader';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxCdkLoaderModule.forRoot(), HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
