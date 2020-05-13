import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersResponse, User, UserByIDResponse, ChangeRangeUserResponse } from '../interfaces/UserInterfaces';
import { UserService } from './user.service';

const url = environment.url;


@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {
  private usersPage: number = 0;

  userChange = new EventEmitter();


  constructor(private http: HttpClient, private userService: UserService) { }


  getUser(idUser: string) {
    return new Promise<User>(resolve => {
      this.http.get<UserByIDResponse>(`${url}/user/get/${idUser}`).subscribe(data => {
        if (data.ok) {
          return resolve(data.user)
        } else {
          return resolve(null);
        }
      })
    })
  }

  deleteUser(idUser:string){
    return new Promise(async resolve => {
      const token = await this.userService.getToken();
      if (token != null) {
        const headers = new HttpHeaders({
          'x-token': token
        })
        this.http.delete(`${url}/user/deleteUser/${idUser}`, { headers }).subscribe((resp:any) => {
          if (resp.ok) {
            this.userChange.emit();
            return resolve(true);
          } else {
            return resolve(false);
          }
        })
      }
    })
  }

  getUsers(reset = false) {
      if (reset) {
        this.usersPage = 0
      }
      this.usersPage++;
      return this.http.get<UsersResponse>(`${url}/user/?page=${this.usersPage}`)
  }

  convertUserToEmployee(idUser: String) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken();
      if (token != null) {
        const headers = new HttpHeaders({
          'x-token': token
        })
        this.http.post<ChangeRangeUserResponse>(`${url}/user/changeRange/${idUser}`, { employee: true,admin: false }, { headers }).subscribe(resp => {
          if (resp.ok) {
            this.userChange.emit();
            return resolve(true);
          } else {
            return resolve(false);
          }
        })
      }
    })
  }

  convertUserToClient(idUser: String) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken();
      if (token != null) {
        const headers = new HttpHeaders({
          'x-token': token
        })
        this.http.post<ChangeRangeUserResponse>(`${url}/user/changeRange/${idUser}`, { employee: false,admin: false }, { headers }).subscribe(resp => {
          if (resp.ok) {
            this.userChange.emit();
            return resolve(true);
          } else {
            return resolve(false);
          }
        })
      }
    })
  }

  convertUserToAdmin(idUser: String) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken();
      if (token != null) {
        const headers = new HttpHeaders({
          'x-token': token
        })
        this.http.post<ChangeRangeUserResponse>(`${url}/user/changeRange/${idUser}`, { admin: true }, { headers }).subscribe(resp => {
          if (resp.ok) {
            this.userChange.emit();
            return resolve(true);
          } else {
            return resolve(false);
          }
        })
      }
    })
  }




}
