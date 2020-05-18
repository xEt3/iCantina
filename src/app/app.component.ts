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
  @ViewChild("IonMenu", { static: true }) menu: IonMenu;
  public selectedPath = "/products";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public userService: UserService,
    private navController: NavController,
    private pushService: PushService
  ) {
    this.initializeApp();
    if (!this.platform.is('cordova') && !this.platform.is('capacitor')) {
      this.router.events.subscribe((event: RouterEvent) => {
        if (event.url) {
          switch (event.url) {
            case '/products-management':
              this.selectedPath = event.url
              break;
            case '/my-orders':
              this.selectedPath = event.url
              break
            case "/user-management":
              this.selectedPath = event.url
              break
            case "/order-management":
              this.selectedPath = event.url
              break
            default:
              this.selectedPath = "/products"
          }
        }
      })
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByName('white');
      this.statusBar.styleDefault();
      this.splashScreen.hide()
      this.pushService.initConfiguration();
    });
  }

  login() {
    this.userService.loginGoogle();
    this.menu.close(true);
  }

  logout() {
    this.userService.logout();
    this.menu.close(true);
  }

}
