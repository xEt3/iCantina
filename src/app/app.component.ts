import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';
import { Page } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { ThrowStmt } from '@angular/compiler';
import { Router, RouterEvent } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  pages: Observable<Page[]>;
  public selectedPath = "/home";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private router: Router,
    public userService:UserService
  ) {
    this.initializeApp();
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url || this.selectedPath;
      if(this.selectedPath='/'){
        this.selectedPath="/home"
      }
      console.log(this.selectedPath);
      
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pages = this.dataService.getMenuOpt();
    });
  }
}
