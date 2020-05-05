import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input()title:string;

  constructor(private userService:UserService) { }

  ngOnInit() {}

  logout(){
    this.userService.logout();
  }
}
