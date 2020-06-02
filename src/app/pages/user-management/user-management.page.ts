import { Component, OnInit } from '@angular/core';
import { UsersManagementService } from '../../services/users-management.service';
import { User } from '../../interfaces/UserInterfaces';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {

  loading=false;
  users: User[] = [];
  usersFound:User[]=[];
  term:string=undefined ;
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
      this.infineScrollEnable = true;
    }
    if (this.term===undefined  )
      this.getUsers(reset,ev);
    else {
      this.searchUsers(reset,ev);
    }
  }

  private getUsers(reset=false,ev){
    if (reset) {
      this.users = [];
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

  private searchUsers(reset=false,ev){
    if(reset){
      this.usersFound=[];
      this.loading=true
    }
    this.usersManagementService.searchUsers(this.term,reset).subscribe(data=>{
      this.usersFound.push(...data.users);
      this.loading=false;
      if (data.users.length === 0) {
        this.infineScrollEnable = false;
      }
      if (ev) {
        ev.target.complete();
      }
    })
  }

  onSearchChange(ev){
    const term=ev.detail.value;
    if(term!==""){
      this.term=term;
      this.nexts(null,true)
    }else{
      this.term=undefined;
    }
  }


}
