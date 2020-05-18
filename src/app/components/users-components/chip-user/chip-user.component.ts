import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../interfaces/UserInterfaces';
import { ModalController } from '@ionic/angular';
import { UserViewComponent } from '../user-view/user-view.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-chip-user',
  templateUrl: './chip-user.component.html',
  styleUrls: ['./chip-user.component.scss'],
})
export class ChipUserComponent implements OnInit {

  @Input()user:User;
  @Input()text:string;
  @Input()color:string="primary";

  constructor(
    private modalController:ModalController,
    public userService:UserService
  ) { }

  ngOnInit() {}


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
