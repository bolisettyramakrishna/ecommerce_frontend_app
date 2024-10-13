import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resetpwd } from '../common/resetpwd';

@Injectable({
  providedIn: 'root'
})
export class ResetpwdService {

  private apiUrl = "http://localhost:8082/api/customer/reset-pwd";

  constructor(private httpClient: HttpClient) { }

 

  resetpassword(Resetpwd: Resetpwd,email:string):Observable<string>{
    console.log("Inside email check"+email+" "+Resetpwd.newPwd+" "+Resetpwd.confirmNewPwd);
    const url = `${this.apiUrl}/${email}`;
    console.log("URL is "+url);
    return this.httpClient.post(url,Resetpwd,{responseType:'text'});
  }
}
