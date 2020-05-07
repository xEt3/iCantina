import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { User, LoginResponse, MeResponse, UpdateUserResponse } from '../interfaces/UserInterfaces';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { CartService } from './cart.service';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private token = null;
  user: User = {};
  isLoged = false;
  isEmployee = false;
  isAdmin = false;


  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navController: NavController,
    private cartService:CartService
  ) {
    this.verifyToken();
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

  async getToken() {
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
  }


  async verifyToken(): Promise<boolean> {
    await this.loadToken()
    if (!this.token) {
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      })
      this.http.get<MeResponse>(`${url}/user/me`, { headers }).subscribe(resp => {
        if (resp.ok) {
          this.user = resp.user;
          this.isEmployee = this.user.employee
          this.isAdmin = this.user.admin
          this.isLoged = true;
          resolve(true);
        } else {
          this.navController.navigateRoot('/login');
          resolve(false)
        }
      })
    });
  }

  login(mail: string, password: string) {
    this.cartService.reset();
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

  logout() {
    this.token = null;
    this.user = null;
    this.isAdmin=false;
    this.isEmployee=false;
    this.isLoged=false;
    this.storage.clear();
    this.navController.navigateRoot('/login', { animated: true });
  }




}
