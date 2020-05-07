import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input()title:string;

  constructor(public userService:UserService,private navController:NavController) { }

  ngOnInit() {}

  logout(){
    this.userService.logout();
  }
  login(){
    this.navController.navigateRoot("/login");
  }
}
