import { Component, OnInit, Inject } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController,
  AlertController
} from 'ionic-angular';
import { FavoritesProvider} from "../../providers/favorites/favorites";
import { Dish} from "../shared/dish";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the FavoritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;
  id:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private favoriteservice: FavoritesProvider,
              private toastCtrl:ToastController,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController,
              @Inject('BaseURL') private BaseURL,
              private storage : Storage) {
  }

  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
    this.storage.set('dish',this.favorites);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('delete', id);
     let alert = this.alertCtrl.create({
       title : 'Confirme Title !',
       subTitle : 'Do you want delete Favorite ' + id,
       buttons:[
         {
           text:'Cancel',
           role:'cancel',
           handler:()=>{
             console.log('Delete cancelled!')
           }
         },
         {
           text:'Delete',
           handler:()=>{

             let loading = this.loadingCtrl.create({
               content : 'Deleting ....'
             });
             loading.present();
             let toast = this.toastCtrl.create({
               message : 'Dish ' + id + ' deleting successfully',
               position:'bottom',
               duration : 3000
             })
             this.favoriteservice.deleteFavorite(id)
               .subscribe(favorites => {this.favorites = favorites;loading.dismiss();toast.present();},
                 errmess => {this.errMess = errmess;loading.dismiss();toast.present();});
             this.storage.remove('id');
           }
         }
       ]

     });
     alert.present();
    item.close();
  }
}
