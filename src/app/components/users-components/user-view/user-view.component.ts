import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../interfaces/UserInterfaces';
import { ModalController, PopoverController } from '@ionic/angular';
import { UserService } from '../../../services/user.service';
import { PopoverChangeRangeComponent } from '../popover-change-range/popover-change-range.component';
import { OrdersManagementService } from '../../../services/orders-management.service';
import { UIService } from '../../../services/ui.service';
import { UsersManagementService } from '../../../services/users-management.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {

  @Input()user:User;
  range={name:"",color:""};
  ordersUser=[];
  infineScrollEnable=true

  constructor(
    private modalController:ModalController,
    public userService:UserService,
    private popoverController:PopoverController,
    private ordersManagementService:OrdersManagementService,
    private uiService:UIService,
    private usersManagementService:UsersManagementService
  ) { }

  ngOnInit() {
    this.calculateRange()
    this.nexts(null,true)
  }

  calculateRange(){
    if(this.user.admin){
      this.range.name='Administrador'
      this.range.color='danger'
    }else if(this.user.employee){
      this.range.name='Empleado'
      this.range.color='warning'
    }else{
      this.range.name='Cliente'
      this.range.color='primary'
    }
  }

  async nexts(ev?,reset:boolean=false){
    if (reset) {
      this.infineScrollEnable = true;
      this.ordersUser = [];
    }
    const query = await this.ordersManagementService.getOrdersClient(this.user._id,reset)
    query.subscribe(data => {
      this.ordersUser.push(...data.orders);
      if (data.orders.length === 0) {
        this.infineScrollEnable = false;
      }
      if (ev) {
        ev.target.complete();
      }
    })
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    });
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
    const { data } = await popover.onWillDismiss();
    console.log(data);this.calculateRange();
  }

  async deleteUser(){
    const header='Eliminar usuario';
    const message= '¿Seguro que dese eliminar al usuario '+this.user.name+'? Se eliminara el usuario y todos sus pedidos';
    const resp = await this.uiService.presentAlertConfirm(header,message);
    if(resp===true){
      const ok = await this.usersManagementService.deleteUser(this.user._id);
      console.log(ok);
      
      if(ok){
        this.uiService.presentToast('Usuario eliminado','success');
        this.dismiss();
      }else{
        this.uiService.presentToast('ERROR al eliminar el usario','danger')
      }
    }
  }

}
