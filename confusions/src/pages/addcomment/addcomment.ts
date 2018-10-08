import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Validators,FormGroup,FormBuilder} from "@angular/forms";
import {Comment} from "../shared/comment";
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
export class AddcommentPage{
  content:Comment;
  comments:FormGroup;
  dish:Dish;
  i:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder:FormBuilder,
              private viewCtrl:ViewController,
              @Inject('BaseURL') private BaseURL) {
              this.comments = this.formBuilder.group({
              rating:5,
              comment:['', Validators.required],
              author:['', Validators.required],
                date:'2007/05/12'
            });
  }



  onSubmit() {
    //console.log(this.comment.value);

    let userComment: Comment = {
      author: this.comments.value.author,
      rating: Number(this.comments.value.rating),
      comment: this.comments.value.comment,
      date: new Date().toISOString()
    };

    console.log(userComment);
    this.viewCtrl.dismiss(userComment);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcommentPage');
  }

}
