import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{PlaysearchPage} from '../playsearch/playsearch';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {


  }
  goToPlaySearch(){
    this .navCtrl.push(PlaysearchPage);
  }

}
