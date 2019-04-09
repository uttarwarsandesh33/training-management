import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IServiceResponse } from '../../common/models/service-response';
import { catchError, finalize, map } from 'rxjs/operators';
import { BaseApp } from '../../common/base-app';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends BaseApp {

  serviceResponse: IServiceResponse<any>;

  constructor(
    private http: HttpClient,
    injector: Injector
  ) {
    super(injector);
  }

  post<T>(url: string = "", serviceResponse: IServiceResponse<T> = null, requestBody?: T, headers?: any, isLoading: boolean = true) {
    this.serviceCall('post', url, serviceResponse, requestBody, headers, isLoading)
  }
  put<T>(url: string = "", serviceResponse: IServiceResponse<T> = null, requestBody?: T, headers?: any, isLoading: boolean = true) {
    this.serviceCall('put', url, serviceResponse, requestBody, headers, isLoading)
  }

  get<T>(url: string = "", serviceResponse: IServiceResponse<T> = null, headers?: any, isLoading: boolean = true) {
    this.serviceCall('get', url, serviceResponse, null, headers, isLoading);
  }

  protected serviceCall<T extends any>(method: string, url: string = "", serviceResponse: IServiceResponse<T> = null, requestBody: any = null, headers: any = null, isLoading: boolean = true) {
    this.presentLoading(isLoading);
    this.getHttpClient(method, url, requestBody, headers)
      .pipe(
        finalize(() => {
          this.presentLoading(false);
        }))
      .subscribe((res) => {
        serviceResponse.success(res);
      }, err => {
        serviceResponse.fail(err);
      })
  }

  private getHttpClient<T>(method: string = 'get', url: string = "", requestBody?: T, headers?: any) {

    let finalUrl = this.URL_CONSTANTS.BASE_URL + url;
    let options = this.generateHeader(headers);
    // 
    switch (method) {
      case 'post': {
        return this.http.post<T>(finalUrl, requestBody, { headers: options })
      }
      case 'put': {
        return this.http.put<T>(finalUrl, requestBody, { headers: options })
      }
      default: {
        return this.http.get<T>(finalUrl, { headers: options })
      }
    }
  }

  protected generateHeader(header?) {
    let httpConfig: any = {
      'Accept': 'application/json',
    };
    if(sessionStorage.getItem('token')){
      httpConfig['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
    }
    if (header) {
      Object.assign(httpConfig, header);
    }
    return new HttpHeaders(httpConfig)
  }


}
