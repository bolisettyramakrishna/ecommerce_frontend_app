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

  resetpassword(Resetpwd: Resetpwd):Observable<string>{
    console.log("Inside email check"+Resetpwd.email+" "+Resetpwd.newPwd+" "+Resetpwd.confirmNewPwd);
    return this.httpClient.post(this.apiUrl,Resetpwd,{responseType:'text'});
  }
}
