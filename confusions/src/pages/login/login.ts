import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ViewController} from 'ionic-angular';
import {User} from "../shared/user";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { RegisterPage } from "../register/register";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  formLogin : FormGroup;
  user:User={
    username:'',
    password:''
  };
  constructor(public navCtrl: NavController, public modalCtrl:ModalController,
              private formBuilder:FormBuilder,
              private viewCtrl:ViewController,
              private storage : Storage) {
        this.formLogin = this.formBuilder.group({
          username:['',Validators.required],
          password:['',Validators.required],
          remember:true
        });

        storage.get('user').then(user=>{
          if(user){
            user = this.user;
            this.formLogin
              .patchValue({
                  'username':this.user.username,
                  'pass':this.user.password
                 }
              );
          }
          else{
            console.log('User not define');
          }
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  onSubmit(){
    console.log(this.formLogin.value,this.user);
    this.user.username = this.formLogin.get('username').value;
    this.user.password = this.formLogin.get('password').value;
    if(this.formLogin.get('remember').value){
      this.storage.set('user',this.user);
    }
    else {
      this.storage.remove('user');
    }

    this.viewCtrl.dismiss();
  }

  onRegister(){
    let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
    modal.onDidDismiss(()=>this.dismiss());

  }
}
