import {Component, Inject, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LeaderProvider} from "../../providers/leader/leader";
import {Leader} from "../shared/leader";
import {ContactService} from "../Services/contact.service";
import {Contact} from "../model/Contact";

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit{

  leaders : Leader[];
  errMess: string;
  i:number;
  contact:Contact;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private leaderservice:LeaderProvider,
              private contactService:ContactService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leaderservice.getLeaders()
      .subscribe(leaders => this.leaders = leaders,
        errmess => this.errMess = <any>errmess);
      this.contact = this.contactService.listContact;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
}
