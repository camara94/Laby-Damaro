import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Validators,FormGroup,FormBuilder} from "@angular/forms";
import {Dish} from "../shared/dish";

/**
 * Generated class for the AddcommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcomment',
  templateUrl: 'addcomment.html',
})
export class AddcommentPage {
  dish:Dish;
  comments:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder:FormBuilder,
              private viewCtrl:ViewController) {
            this.comments = this.formBuilder.group({
              rating:5,
              comment:['', Validators.required],
              author:['', Validators.required],
              date:['', Validators.required]
            });
  }

  onSubmit(){
    this.viewCtrl.dismiss(this.comment.value);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcommentPage');
  }

}
