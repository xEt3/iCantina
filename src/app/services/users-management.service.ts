import { Injectable } from '@angular/core';
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

  getUsers(reset = false) {
    return new Promise<User[]>(resolve => {
      if (reset) {
        this.usersPage = 0
      }
      this.usersPage++;
      this.http.get<UsersResponse>(`${url}/user/?page=${this.usersPage}`).subscribe(data => {
        if (data.ok) {
          return resolve(data.users);
        } else {
          return resolve([])
        }
      })
    })
  }

  convertUserToEmployee(idUser: String) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken();
      if (token != null) {
        const headers = new HttpHeaders({
          'x-token': token
        })
        this.http.post<ChangeRangeUserResponse>(`${url}/user/changeRange/${idUser}`, { employee: true }, { headers }).subscribe(resp => {
          if (resp.ok) {
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
            return resolve(true);
          } else {
            return resolve(false);
          }
        })
      }
    })
  }




}
