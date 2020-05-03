import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../interfaces/UserInterfaces';
import { UserService } from '../../services/user.service';
import { NavController, IonSlides } from '@ionic/angular';
import { UIService } from '../../services/ui.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild("slideMain",{static:true})slidesMain:IonSlides;
  
  loginUser={
    email:'',
    password:''
  }

  registerUser:User={
    mail:'',
    password:'',
    name:'',
  }

  constructor(private userService:UserService,
    private navController:NavController,
    private uiService :UIService) { }

  async ngOnInit() {
     await this.slidesMain.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if(fLogin.valid){
      const valid = await this.userService.login(this.loginUser.email,this.loginUser.password);
      if(valid){
        this.navController.navigateRoot('home',{animated:true});
      }else{
        this.uiService.alertaInformativa('Usuario o contraseña incorrectos')
      }
    }
  }

  async register(fRegistro:NgForm){
    const valido = await this.userService.register(this.registerUser)
    if(valido){
      this.navController.navigateRoot('/home',{animated:true});
    }else{
      this.uiService.alertaInformativa('El correo electronico ya existe')
    }
  }

  async mostrarRegistro(){
   await this.slidesMain.lockSwipes(false);
   await  this.slidesMain.slideTo(1);
   await this.slidesMain.lockSwipes(true);
  }

  async mostarIngresar(){
    await this.slidesMain.lockSwipes(false);
    await  this.slidesMain.slideTo(0);
    await this.slidesMain.lockSwipes(true);
  }
}
