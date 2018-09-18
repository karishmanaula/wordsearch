import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config } from 'ionic-angular';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// import {Observable} from 'rxjs';

import { FetchApiProvider } from '../../providers/fetch-api/fetch-api';
/**
 * Generated class for the PlaysearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playsearch',
  templateUrl: 'playsearch.html',
})
export class PlaysearchPage {
  word;
  public data:any;
 public showdata: {};
 typedText :any;
 
 wordmatched=[];
 word1;items=[];

  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,private fetch:FetchApiProvider) {
   // this.word=this.randomString();
  
    this.word=(this.fetch.getUrlApi().subscribe(data=>{
      console.log(data);
      let tempword="";
      for(let i=0;i<data[0].alphabet.length;i++){
        tempword+=data[0].alphabet[i];
      }
      this.word=tempword;
      console.log(this.word);
    }));

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaysearchPage');
  
   
  }
 verifyWords(typedText){
  let wordpresent=0;
  let wordfound=false;
  this.showdata=(this.fetch.getUrlApi().subscribe(data=>{
  console.log(data);
  for(let i=0;i<this.wordmatched.length;i++){
  if(this.wordmatched[i]==typedText)
  {
    alert("duplicate word");
    return;
  }
}
  let tempword="";
    for(let i=0;i<data[0].words.length;i++){
    tempword=data[0].words[i];
    console.log(tempword);
  
  }
  this.word=tempword;
  for(let i=0;i<data[0].words.length;i++)
  {
    
    if(typedText===data[0].words[i]){
      wordfound=true;
      //this.word1=typedText;
    this.items.push(typedText);
     
      
    }
   
    
  }
   
   if(wordfound===true) 
   {  
   alert("word is matched"); 
   this.wordmatched.push(this.typedText);
   console.log(this.wordmatched);
  /* for(let i=0;i<this.wordmatched.length;i++){
     this.matchedword.push(this.wordmatched);
   }*/
  
    }
  else
  {
    alert("notfound or blank");
  }
 
  }));
 /* for(let i=0;i<this.wordmatched.length;i++)
  {this.matchedword.push(this.wordmatched);
  }
  console.log(this.matchedword);*/
 
 //for(let i=0;i<this.wordmatched.length;i++){
//  this.wordlength.push(this.wordmatched[i]);
 
// }
  
 
} 
 
}





