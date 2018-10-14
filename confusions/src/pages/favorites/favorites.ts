import { Component, OnInit, Inject } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController,
  AlertController
} from 'ionic-angular';
import { FavoritesProvider} from "../../providers/favorites/favorites";
import { Dish} from "../shared/dish";
import { Storage } from "@ionic/storage";
import {LocalNotifications} from "@ionic-native/local-notifications";

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

  favorites : Array<any>;
  errMess: string;
  id:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private favoriteservice: FavoritesProvider,
              private toastCtrl:ToastController,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController,
              @Inject('BaseURL') private BaseURL,
              private storage : Storage,
              private localNotifications:LocalNotifications) {
      this.favorites = [];
    this.storage.get('favorite').then(favorites =>{
      if(favorites){
        console.log(favorites);
        this.favorites = favorites;
      }
      else{
        console.log("favorite not define");
      }
    })
  }

  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
    this.addFavorite(this.id);
  }

  addFavorite(id:number):boolean{
    if(this.isFavorite(id)){
      this.favorites.push(id);
      this.storage.set('dish',this.favorites);
      this.localNotifications.schedule({
        id:id,
        text:"Dish" + id + " added successfully"
      })
    }
    console.log("favorites",this.favorites);
    return true;
  }

  isFavorite(id:number):boolean{
    if(this.favorites.indexOf(id)>=0){
      return true;
    }
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
