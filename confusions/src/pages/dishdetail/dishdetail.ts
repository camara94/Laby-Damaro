import { Component, Inject } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Dish} from "../shared/dish";
import { ServicesProvider } from './../../providers/services/services';
import {FavoritesProvider} from "../../providers/favorites/favorites";
import {AddcommentPage} from "../addcomment/addcomment";

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
              private disheService:ServicesProvider,
              private favoriteservice:FavoritesProvider,
              private toastCtrl:ToastController,
              private actionSheetCtrl:ActionSheetController) {
    this.dish = navParams.get('dish');
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
    this.favorite = this.disheService.isFavorite(this.dish.id);
  }

  /*onAddService(){
    console.log('add favorite',this.dish.id);
    this.favorite = this.disheService.addFavorite(this.dish.id);
  }*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added successuffully',
      position:'top',
      duration:3000
    }).present();
  }

    presentActionSheet() {
      const actionSheet = this.actionSheetCtrl.create({
        title: 'Select Actions',
        buttons: [
          {
            text: 'Add to Favorites',
            role: 'destructive',
            handler: () => {
              console.log('Destructive clicked');
            }
          },{
            text: 'Add Comment',
            handler: () => {
              console.log('Archive clicked');
              this.navCtrl.push(AddcommentPage);
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
  }

