import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ContactService} from "../Services/contact.service";
import {Contact} from "../model/Contact";

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage implements OnInit{
   contact:Contact;
   i:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,private contactService:ContactService) {
  }

  ngOnInit(){
     this.contact = this.contactService.listContact;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

}
