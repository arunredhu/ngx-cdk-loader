# This library is under development. Please don't use as of now. (In Draft Stage)

# NgxCdkLoader

`ngx-cdk-loader` module provides the services & directive to manage the state of the loader within the Angular application. Please note that this package doesn't provide any UI loader element. You can make your own reusable UI loader component using this loader CDK.

## Description

It becomes very important for any frontend application to show/hide the loader based on some async tasks i.e. loading data from server using an API. This module automatically manages the state of loader based on that if there is any network api response is pending or not. It provide a service which contain the reactive state and methods to control the state of the loader and a http interceptor which update the loader state based on the APIs. It also provide a directive which can be applied to a loader element (Some HTML Element or Angular Component such as Progress bar etc) to show/hide that element automatically based on the loader state.

## Installation (In Draft Stage)

You need to install the npm module:

```sh
npm install ngx-cdk-loader --save
```

## Usage

#### 1. Import the `NgxCdkLoaderModule`:

Now, you can use `ngx-cdk-loader` within your Angular app. You have to import `NgxCdkLoaderModule.forRoot()` in the `root` or `core` module of the app.

The [`forRoot`](https://angular.io/api/router/RouterModule#forroot) static method is a convention that provides and configures services at the same time.
Make sure you only call this method in the `root` or `core` module of your application, most of the time called `AppModule` or `CoreModule`.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxCdkLoaderModule } from 'ngx-cdk-loader';

@NgModule({
    imports: [
        BrowserModule,
        NgxCdkLoaderModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

When you import `NgxCdkLoaderModule` to your application, it will automatically enable the `NgxLoaderHttpInterceptor` i.e. you don't have to add it explicitly in the application providers. This is a http interceptor which intercepts each http request made through Angular [`HttpClient`](https://angular.io/api/common/http/HttpClient) and keeps the track of total pending requests which are waiting for the response. Based on pending requests, it updates the state of loader in `NgxLoaderService` service i.e. when a request is made, it set the state of loading as `true` and when it `completes`, `cancelled` or the specified timeout happens, it set the state as `false`. This state from `NgxLoaderService` can be used in your app to hide/show the loader.

##### Configuration

`forRoot` method can be used to pass the custom configurations to the `ngx-cdk-loader`. If you don't pass any configuration, then default configuration will be used. Below are the supported configurations

 Property          | Type             | Default Value         | Description
 ------------------|------------------|-----------------------|-------------------------------------------
 `loadingTimeout`  | `number`         | 10000 (milliseconds)  | Hide the loader after after specific timeout

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxCdkLoaderModule } from 'ngx-cdk-loader';

@NgModule({
    imports: [
        BrowserModule,
        NgxCdkLoaderModule.forRoot({
          loadingTimeout: 5000 // milliseconds
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

##### Bypass `NgxLoaderHttpInterceptor`

Sometimes, there can be a use case where a developer don't want to use the global loader state for a specific API call and want to manage its own state for loader. In that case, the developer want to bypass the `NgxLoaderHttpInterceptor` for that specific http request. This can be easily done with the help of `customHeaders` in the http request. `x-supress-ngx-loader` property can be set on [`HttpHeaders`](https://angular.io/api/common/http/HttpHeaders) to supress the global loader for a particular request. 

```ts
let httpHeaders = new HttpHeaders();
httpHeaders = httpHeaders.append('x-supress-ngx-loader', 'true');
this.http
  .get('<Your API URL>', {
      headers: httpHeaders,
  });
```

`NgxLoaderHttpInterceptor` uses this header property and pass the request to the next handler without any change in state of loader. Also, this custom header property will be automatically removed and will not be further passed to next `handlers/server`

> Note: Never call a `forRoot` static method in the `SharedModule`

#### Use `NgxLoaderService` to show/hide the loader

`NgxLoaderService` service is responsible to manage the state of the loader in the app. This service expose an observable which emits the state whenever there is any change in the state and exposes 2 methods to update the state.

Inject the `NgxLoaderService` service to any `component|directive` and use the `loading$` observable to listen to the loading state values.

```ts
ngxLoaderService.loading$.subscribe((loading: boolean) => {
  if (loading) {
    // show the loader
  } else {
    // hide the loader
  }
});
```

or you can directly use `async` pipe to `html` templates to show/hide your loader

```html
<div *ngIf="ngxLoaderService.loading$ | async">Loading...</div>
```

In case, you want to control the state of loader by your own. You can use `showLoader` or `hideLoader` methods of the service to update the state.

```ts
ngxLoaderService.showLoader();
```

```ts
ngxLoaderService.hideLoader();
```

## NgxCdkLoaderDirective

This is a angular structural directive. This directive hide/show the host element based on the loader state.

## Other Info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
