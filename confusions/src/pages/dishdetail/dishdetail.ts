import {Component, Inject } from '@angular/core';
import {
  ActionSheetController, IonicPage, ModalController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {Dish} from "../shared/dish";
import { ServicesProvider } from './../../providers/services/services';
import {FavoritesProvider} from "../../providers/favorites/favorites";
import {AddcommentPage} from "../addcomment/addcomment";
import { Storage} from "@ionic/storage";

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
              private disheService:ServicesProvider,
              private favoriteservice:FavoritesProvider,
              private toastCtrl:ToastController,
              private actionSheetCtrl:ActionSheetController,
              private  viewCtrl:ViewController,
              private modalCtrl:ModalController,
              @Inject('BaseURL') private BaseURL,
              private storage:Storage) {
    this.dish = navParams.get('dish');
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
    this.favorite = this.disheService.isFavorite(this.dish.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.storage.set('dish',this.dish);
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
               this.openComment();
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

  openComment() {
    let modal = this.modalCtrl.create(AddcommentPage);
    modal.onDidDismiss((data) => {
      // do something with data
      if(data)
        this.dish.comments.push(data);
    });
    modal.present();
  }

}

