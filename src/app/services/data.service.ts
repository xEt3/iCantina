import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Page } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getMenuOpt() {
    return this.http.get<Page[]>("assets/data/menu.json");
  }
}
