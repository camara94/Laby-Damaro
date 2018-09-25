import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  favorites : Array<any>;
  constructor(public http: Http) {
    console.log('Hello ServicesProvider Provider');
    this.favorites = [];
  }

  addFavorite(id:number):boolean{
    this.favorites.push(id);
    return true;
  }

  isFavorite(id:number):boolean{
    return this.favorites.some(el => el === id);
  }
}
