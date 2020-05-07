import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../interfaces/UserInterfaces';
import { UsersManagementService } from '../../services/users-management.service';
import { PopoverController } from '@ionic/angular';
import { PopoverChangeRangeComponent } from '../popover-change-range/popover-change-range.component';

@Component({
  selector: 'app-item-user',
  templateUrl: './item-user.component.html',
  styleUrls: ['./item-user.component.scss'],
})
export class ItemUserComponent implements OnInit {

  @Input() user: User;
  range:string;

  constructor(
    private usersManagementService: UsersManagementService,
    private popoverController: PopoverController,
  ) { }

  ngOnInit() {

  }

  async changeRange(ev) {
    const popover = await this.popoverController.create({
      component: PopoverChangeRangeComponent,
      event: ev,
      mode: 'ios',
      backdropDismiss: true,
      componentProps:{
        user:this.user
      }

    });
    await popover.present();
  }

}
