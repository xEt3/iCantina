import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NavController, Platform } from '@ionic/angular';
import * as $ from 'jquery';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { UIService } from '../../../services/ui.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { GoogleAuthService } from '../../../google-auth.service';
import { UserGoogle } from '../../../interfaces/interfaces';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input() title: string;

  constructor(
    private platform: Platform,
    public userService: UserService,
    private navController: NavController,
    private afAuth: AngularFireAuth,
    private uiService: UIService,
    private googlePlus: GooglePlus,
  ) { }

  ngOnInit() { }

  loginGoogle() {
    this.userService.loginGoogle()
  }


  logout() {
    this.userService.logout();
  }

  login() {
    this.navController.navigateRoot("/login");
  }
}
