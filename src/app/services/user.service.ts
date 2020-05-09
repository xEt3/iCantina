import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { User, LoginResponse, MeResponse, UpdateUserResponse } from '../interfaces/UserInterfaces';
import { Storage } from '@ionic/storage';
import { NavController, Platform } from '@ionic/angular';
import { CartService } from './cart.service';
import { UserGoogle } from '../interfaces/interfaces';
import { AngularFireAuth } from '@angular/fire/auth';
import { UIService } from './ui.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/app';


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
    private cartService:CartService,
    private afAuth: AngularFireAuth,
    private uiService:UIService,
    private googlePlus: GooglePlus,
    private platform:Platform
  ) {
    this.verifyToken();
  }

  async loginGoogle() {
    let res
    if (this.platform.is('android')) {
     res = await this.loginGoogleAndroid();
    } else {
    res =   this.loginGoogleWeb();
    }
    return res;
  }

  private async loginGoogleAndroid() {
    const res:any = await this.googlePlus.login({
      'webClientId': '283447142110-u63bi9fk6n8vpssndtbaov52idlhk4st.apps.googleusercontent.com',
      'offline': true
    });
    console.log(res)
    if(res.userId){
      const userGoogle:UserGoogle=
      {
        name:res.displayName, 
        mail:res.email,
        uid:res.userId,
        img:res.imageUrl
      }
      const resp = await this.authUser(userGoogle);
      return resp;
    }else{
      return false;
    }
  }

  private async loginGoogleWeb() {
    const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user:any = res.user;
    console.log(user)
    if(user.providerData[0].uid){
      const userGoogle:UserGoogle=
      {
        name:user.displayName, 
        mail:user.email,
        uid:user.providerData[0].uid,
        img:user.photoURL
      }
      console.log(userGoogle);
      
      const resp = await this.authUser(userGoogle);
     return resp;
    }else{
      return false;
    }
  }

  private authUser(user: UserGoogle) {
    return new Promise(resolve => {
      this.http.post<LoginResponse>(`${url}/google/auth`, user).subscribe(async resp => {
       console.log(resp);
       
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
      this.navController.navigateRoot('/products');
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
          this.navController.navigateRoot('/products');
          resolve(false)
        }
      })
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
    this.navController.navigateRoot('/products', { animated: true });
  }

}
