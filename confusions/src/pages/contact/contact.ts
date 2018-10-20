import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ContactService} from "../Services/contact.service";
import {Contact} from "../model/Contact";
import { EmailComposer } from "@ionic-native/email-composer";
import { CallNumber } from "@ionic-native/call-number";

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
  constructor(public navCtrl: NavController,private contactService:ContactService,
              private emailComposer:EmailComposer,
              private callNumber:CallNumber) {
  }

  sendEmail(){
    let email = {
      to:'confusion@food.net',
      subject:'[confusion]: Query',
      body:'Dear Sir/Madam : ',
      isHtml:true
    }
    this.emailComposer.open(email);
  }

  ngOnInit(){
     this.contact = this.contactService.listContact;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  callRestaurant(){
    this.callNumber.callNumber("+852 1234 5678", true)
      .then(res => console.log('Register dialer!', res))
      .catch(err => console.log('Error Register dialer', err));
  }

}
