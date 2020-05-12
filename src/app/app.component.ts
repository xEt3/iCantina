import { Component, ViewChild } from '@angular/core';
import { Platform, IonMenuToggle, NavController, IonMenu } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';
import { Page } from './interfaces/interfaces';
import { ThrowStmt } from '@angular/compiler';
import { Router, RouterEvent } from '@angular/router';
import { UserService } from './services/user.service';
import { PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild("IonMenu",{static:true})menu:IonMenu;
  public selectedPath = "/home";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public userService:UserService,
    private navController:NavController,
    private pushService:PushService
    ) {
    this.initializeApp();
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url || this.selectedPath;
      if(this.selectedPath==='/'){
        this.selectedPath="/home"
      }
      console.log(this.selectedPath);
      
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushService.initConfiguration();
    });
  }

  login(){
    this.userService.loginGoogle();
    this.menu.close(true);
  }

  logout(){
    this.userService.logout();
    this.menu.close(true);
  }

}
