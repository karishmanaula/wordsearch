import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import{Observable}from 'rxjs/Observable'


/*
  Generated class for the FetchApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const API:any="/assets/json/data1.json";
// const API1:any="/assets/json/dictionary.json";
const API1:any="/assets/json/dictionarydata.json";
@Injectable()
export class FetchApiProvider {
 

  constructor(public http: HttpClient) {
    console.log('Hello FetchApiProvider Provider');
  }
getUrlApi()
{
  
  return this.http.get <any>(API);
}
getData(){
  return this.http.get<any>(API1);
  

  
}


getDataFromApi(){
  return this.http.get('/assets/json/dictionarydata.json');
}

}

 
