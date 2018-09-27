import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
//import { HttpModule } from '@angular/http';


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
    other;
    bonusword=[];
    wordmatched=[];
    word1;items=[];
    score=0;
    bonus=0;
    wbonus=0;
    dict;
   // public level:number = 1;
   // var :number = 50;


  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,private fetch:FetchApiProvider) {
      // this.word=this.randomString();
     /*console.log('#########################');
      console.log(navParams.get('data'));
      console.log('#########################');*/

        // if(navParams.get('data')==undefined || navParams.get('data')==NaN) {
        //     this.level = 1;
        // } else {
        //     this.level = navParams.get('data');
        // }

     // this.level=this.navParams.get('data');
   /*   this.word=(this.fetch.getUrlApi().subscribe(data=>{
        console.log(data);
        
        let tempword="";
        for(let i=0;i<data[0].alphabet.length;i++){
          tempword+=data[0].alphabet[i];
        }
        this.word=tempword;
        console.log(this.word);
      }));*/
      let tempword;
      this.dict=(this.fetch.getDataFromApi().subscribe(dictionary=>{
        console.log(dictionary);
        var obj_keys = Object.keys(dictionary);   
        var ran_word = obj_keys[Math.floor(Math.random() * obj_keys.length)];
        console.log(ran_word);
        // if(Object.keys(dictionary)){
        //     tempword=Object.keys(dictionary);
            
        //   }
          this.word=ran_word;
          console.log(this.word);
        }));

  }
  
  ionViewDidLoad() {
      console.log('ionViewDidLoad PlaysearchPage');
      // console.log( this.fetch.getData1());
  }

  verifyWords(typedText){
    console.log(typedText);
      let wordfound=false;
      this.showdata=(this.fetch.getUrlApi().subscribe(data=>{
          console.log("--------------------------------");
          console.log(data);
          if(typedText.value===""){
            alert("blank");
            return;
          }
        
          
          for(let i=0;i<this.wordmatched.length;i++) {
              if(this.wordmatched[i]==typedText) {
                  alert("duplicate word");
                  return;
              }
          }
         
      

          let tempword="";
          console.log("loop for showing data");
          console.log(data[0].words.length);
          for(let i=0;i<data[0].words.length;i++) {
              tempword=data[0].words[i];
             
              console.log(tempword);
          }
       
         //  if(data[0].words.length===){console.log("level Completed");return;}


         // this.word=tempword;
        //  console.log("hello");
        //  console.log(tempword);
         
          if((typedText.length>this.word.length)||(typedText.length<1)){
              console.log(" check the word limit");
              return;
          }
   
          for(let i=0;i<data[0].words.length;i++) {
            if(typedText===data[0].words[i]) {
                wordfound=true;
                this.items.push(typedText); 
               
               //  this.score++;
                //console.log(this.score);   
            }
           
          }
   
          console.log(wordfound);
          // return false;
          if(wordfound===true) {  
                  console.log("word is matched");
                  this.wordmatched.push(this.typedText);
                  this.score++;
                  console.log(this.score);   
                  console.log(this.wordmatched);
        
                
                  if(data[0].words.length===this.wordmatched.length){
                   // if(1==1){
               /*  console.log("level completed");
                 console.log('level: ', this.level);
                this.level++;
                console.log('level: ', this.level);
                this.goToNext();*/
                
                    this.goToNext();
                 
                 
             }
          }
         if((wordfound===false) && (typedText !== "")) {
            console.log('inside missing word');
              this.dict=(this.fetch.getData().subscribe(dictionary=>{
                    console.log('===============================');
                    console.log(dictionary);
                    console.log('===============================');

                    // return false;
                    /* var thisSession = JSON.parse('dictionary');
                      console.log("checking inside dictionary");
                      if(thisSession.hasOwnProperty('typedtext')){
                        console.log("bonus word");
                      
                    }*/
                    console.log(this.bonusword);
                    for(let i=0;i<this.bonusword.length;i++){
                      if(typedText==this.bonusword[i]){console.log("already exist in bonus");return;}
                    }
                    console.log('not found in bonus words');
                    // console.log(typedText);
                    if(dictionary.hasOwnProperty(typedText)){
                      console.log("bonusword");
                        this.bonusword.push(typedText);
                        this.bonus++;
                    }
                   
                    // console.log(this.bonus);
                    // for(let i in dictionary){
                    //   // console.log(i);
                    //   if(i==typedText){
                    //     console.log("bonusword");
                    //     this.bonusword.push(typedText);
                    //     this.bonus++;
                    //   } 
                    // }
                    console.log(this.bonus);
                    
              }));
              
            }
       
          //if(count==data[0].word.length){console.log("level completed");}  
        }));
     // alert("notfound or blank");
  }
  //} 
 /* goToNext(level){
    console.log('level: ', level);
    this .navCtrl.push(PlaysearchPage,{data:level});

  }*/
  goToNext(){
    this .navCtrl.push(PlaysearchPage);
  } 
  datafetching(typedText){
   let  tempword="";
    console.log(typedText);
    this.dict=(this.fetch.getDataFromApi().subscribe(dictionary=>{
    console.log(dictionary);   
    for(let i=0;Object.keys(dictionary).length;i++){
        tempword+=Object.keys(dictionary);
      }
      this.word=tempword;
      console.log(this.word);

    if(dictionary.hasOwnProperty(typedText)){
        console.log("word found");

         
      }

  }));

}

}



