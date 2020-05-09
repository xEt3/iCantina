import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private http:HttpClient) { }

  authUser(user:any){
    return new Promise(()=>{
      this.http.post(`${url}/google/auth`,user).subscribe(data=>{
        console.log(data);
        if(data['ok']){
          return true;
        }else{
          return false;
        }
      })
    })
  }
}
