import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { NgxLoaderService } from 'ngx-cdk-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngx-cdk-loader-example';

  public ngxLoaderService = inject(NgxLoaderService);
  public http = inject(HttpClient);

  ngOnInit(): void {
    this.ngxLoaderService.loading$.subscribe((loading) => {
      console.log({ loading });
    });
  }

  fetchData() {
    this.http
      .get('https://dummy.restapiexample.com/api/v1/employees')
      .subscribe((data) => {
        console.log({ data });
      });
  }

  fetchData1() {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('x-supress-ngx-loader', 'true');
    this.http
      .get('https://dummy.restapiexample.com/api/v1/employees', {
        headers: httpHeaders,
      })
      .subscribe((data) => {
        console.log({ data });
      });
  }
}
