import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../interfaces/UserInterfaces';
import { UsersManagementService } from '../../../services/users-management.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { PopoverChangeRangeComponent } from '../popover-change-range/popover-change-range.component';
import { UserViewComponent } from '../user-view/user-view.component';

@Component({
  selector: 'app-item-user',
  templateUrl: './item-user.component.html',
  styleUrls: ['./item-user.component.scss'],
})
export class ItemUserComponent implements OnInit {

  @Input() user: User;
  range:string;

  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {

  }

  async showUser() {
    const modal = await this.modalController.create({
      component: UserViewComponent,
      componentProps: {
        user: this.user
      }
    });
    modal.present();
  }

}
