import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { User, LoginResponse, MeResponse, UpdateUserResponse } from '../interfaces/UserInterfaces';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private token = null;
  private user: User = {};
  isLoged=false;


  constructor(
    private http:HttpClient,
    private storage:Storage,
    private navController: NavController
    ) {
      this.loadToken();
     }

  register(user: User) {
    return new Promise(resolve => {
      this.http.post<LoginResponse>(`${url}/user/create`, user).subscribe(async resp => {
        if (resp.ok) {
          await this.saveToken(resp.token);
          resolve(true);
        } else {
          this.token = null
          this.storage.clear();
          resolve(false);
        }
      })
    })
  }

  async getToken(){
    await this.verifyToken();
    return this.token;
  }

  private async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
    await this.verifyToken()
  }

  async loadToken() {
    this.token = await this.storage.get('token') || null;
    if(this.token){
      await this.verifyToken();
    }
  }


  async verifyToken(): Promise<boolean> {
    if (!this.token) {
      // this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      })
      this.http.get<MeResponse>(`${url}/user/me`, { headers }).subscribe(resp => {
        if (resp.ok) {
          this.user = resp.user;
          this.isLoged=true;
          resolve(true);
        } else {
          // this.navController.navigateRoot('/login');
          resolve(false)
        }
      })
    });
  }

  login(mail: string, password: string) {
    return new Promise(resolve => {
      const userCredentials = { mail, password };
      this.http.post<LoginResponse>(`${url}/user/login`, userCredentials).subscribe(async data => {
        if (data.ok) {
          await this.saveToken(data.token);
          resolve(true);
        } else {
          this.token = null
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  updateUser(user: User) {
    return new Promise(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      })
      this.http.post<UpdateUserResponse>(`${url}/user/update`, user, { headers }).subscribe(resp => {
        if (resp['ok']) {
          this.saveToken(resp.token);
          return resolve(true);
        } else {
          return resolve(false);
        }
      })
    })
  }

  async getCurrentUser() {
    if (!this.user) {
      await this.verifyToken();
    }
    return { ...this.user }
  }



}
