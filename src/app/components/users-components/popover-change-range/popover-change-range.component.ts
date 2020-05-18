import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { UsersManagementService } from '../../../services/users-management.service';
import { User } from '../../../interfaces/UserInterfaces';
import { resolve } from 'url';

@Component({
  selector: 'app-popover-change-range',
  templateUrl: './popover-change-range.component.html',
  styleUrls: ['./popover-change-range.component.scss'],
})
export class PopoverChangeRangeComponent implements OnInit {
  @Input() user: User;
  range: string;

  constructor(
    private popoverController: PopoverController,
    private usersManagementService: UsersManagementService
  ) { }

  ngOnInit() {
    if (this.user.admin) {
      this.range = 'admin';
    } else if (this.user.employee) {
      this.range = 'employee';
    } else {
      this.range = 'client';

    }
  }

  makeAdmin() {
    this.usersManagementService.convertUserToAdmin(this.user._id).then(reslve => {
      if (resolve) {
        this.range = 'admin';
        this.dismiss()
        this.user.employee=true;
        this.user.admin=true;
      }
    })
  }
  makeEmployee() {
    this.usersManagementService.convertUserToEmployee(this.user._id).then(reslve => {
      if (resolve) {
        this.range = 'employee';
        this.user.employee=true;
        this.user.admin=false;
        this.dismiss()
      }
    })
  }

  makeClient() {
    this.usersManagementService.convertUserToClient(this.user._id).then(reslve => {
      if (resolve) {
        this.range = 'client';
        this.user.employee=false;
        this.user.admin=false;
        this.dismiss()
      }
    })

  }

  radioChange(rangeToChange) {
    if (rangeToChange === this.range) {
      this.close();
      return
    }
    switch (rangeToChange) {
      case 'admin':
        this.makeAdmin();
        break;

      case 'employee':
        this.makeEmployee();
        break;

      case 'client':
        this.makeClient();
        break;
    }
  }

  dismiss(){
    this.popoverController.dismiss({
      user: this.user
    })
  }

  close() {
    this.dismiss();
  }

}
