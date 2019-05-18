import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataservicesService {

  loginAPI =  environment.baseUrl+ 'login.php';
  registerAPI = environment.baseUrl +'register.php';
  newAPI = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8e6dbd05046c41df87ba3d5d01cd9f97"
  updateProfileAPI  = environment.baseUrl +'editProfile.php';

  newsDetails : any;

  constructor(public http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get(this.newAPI, { responseType: 'text' });
  }

  doLogin(data): Observable<any>{
    return this.http.post(this.loginAPI, data,{ responseType: 'text' });
  }

  doRegister(data): Observable<any>{
    return this.http.post(this.registerAPI, data,{ responseType: 'text' });
  }

  updateProfile(data): Observable<any>{
    return this.http.post(this.updateProfileAPI, data,{ responseType: 'text' });
  }
}
