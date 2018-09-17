import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FetchApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const API:any="/assets/json/data1.json";

@Injectable()
export class FetchApiProvider {
 
  constructor(public http: HttpClient) {
    console.log('Hello FetchApiProvider Provider');
  }
getUrlApi()
{
  
  return this.http.get <any>(API);
}


}
 
