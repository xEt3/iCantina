import { Component, OnInit } from '@angular/core';
import { UsersManagementService } from '../../services/users-management.service';
import { User } from '../../interfaces/UserInterfaces';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {

  users: User[] = [];
  infineScrollEnable = true;

  constructor(private usersManagementService: UsersManagementService) { }

  ngOnInit() {
    this.nexts(null, true);
    this.usersManagementService.userChange.subscribe(() => {
      this.nexts(null, true);
    })
  }


  async nexts(ev?, reset: boolean = false) {
    if (reset) {
      this.users = [];
      this.infineScrollEnable = true;
    }
    this.usersManagementService.getUsers(reset).subscribe(data => {
      this.users.push(...data.users);
      if (data.users.length === 0) {
        this.infineScrollEnable = false;
      }
      if (ev) {
        ev.target.complete();
      }
    });
  }

}
