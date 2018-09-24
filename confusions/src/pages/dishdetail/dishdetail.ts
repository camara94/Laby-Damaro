import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Dish} from "../shared/dish";
import { ServicesProvider } from './../../providers/services/services';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              @Inject('BaseURL') private BaseURL,
              private disheService:ServicesProvider) {
    this.dish = navParams.get('dish');
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
    this.favorite = this.disheService.isFavorite(this.dish.id);
  }

  onAddService(){
    console.log('add favorite',this.dish.id);
    this.favorite = this.disheService.addFavorite(this.dish.id);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

}
