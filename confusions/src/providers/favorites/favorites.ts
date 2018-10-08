import {Http} from "@angular/http";
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Dish} from "../../pages/shared/dish";
import {DishProvider} from "../dish/dish";
import { Storage} from "@ionic/storage";

/*
  Generated class for the FavoritesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoritesProvider {
  favorites: Array<any>;
  errMess: string;
  dish:Dish;
  id:number;
  constructor(public http: Http, private dishservice: DishProvider,
              private storage:Storage) {
    console.log('Hello FavoritesProvider Provider');
    this.favorites = [];
    this.storage.set('dish',this.dish);
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);
      this.storage.set('dish',this.dish);
    console.log('favorites', this.favorites);
    return true;
  }

  isFavorite(id:number):boolean{
    return this.favorites.some(el => el === id);
  }
  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      this.storage.remove('id');
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite ' + id);
    }
  }
}
