import { Component, TemplateRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FetchApiProvider } from '../../providers/fetch-api/fetch-api';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import{AngularFireDatabase} from 'angularfire2/database';
import { shimContentAttribute } from '@angular/platform-browser/src/dom/dom_renderer';
import { Element } from '@angular/compiler';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';


//import { IonicStorageModule } from '@ionic/storage';




@IonicPage()
@Component({
  selector: 'page-gamestart',
  templateUrl: 'gamestart.html',
})
export class GamestartPage {
  public data:any;
  dictionarydata:any;
    public showdata: {};
    typedText :any;
    other;
    count;
    elements = [];
    wordlen=0;
    bonusword=[];
    wordmatched=[];
    word1;items=[];
    score=0;
    bonus=0;
    wbonus=0;
    dict;word;
    InputUser:string;
    key:string ='username';
    arraydata=[];
    ran_word;
    temp="";
    letter=""; 
    arraytemp=[];
    shuffledword1="";
    obj_keys=[];
    obj_values=[];
    tempword="";
    Level=1;
  constructor(public navCtrl: NavController, private angularFiredatabase:AngularFireDatabase,public navParams: NavParams,public http:HttpClient,private fetch:FetchApiProvider,private storage: Storage) {
   let j=0;
      this.dict=(this.fetch.getDataFromApi().subscribe(json=>{
  
      let value=0;
      let tempword="";
      let possiblities="";
      let bonus=0;
      let splitword=[];

      for(let i=0;i<json[0].word.length;i++){
        tempword=json[this.Level-1].word;
        break;
       }
    
      for(let i=0;i<json[0].possibilities[this.Level-1].length;i++){
        var currentWord = json[0].possibilities[i];
        splitword.push(currentWord);
        var v;
        for(let i=0;i<currentWord.length;i++){
          v = document.createElement('input'); 
          v.type="text";
          v.setAttribute('class','letter');
          v.setAttribute('data-word',currentWord);
          v.setAttribute('data-letter',currentWord.charAt(i));
          document.getElementById('test').append(v);
        }
          for(let i=0;i<2;i++){
               var x=document.createElement('br');
                document.getElementById('test').appendChild(x);
                 }
                  console.log(splitword);
       }
       
      for(let i=0;i<json[0].bonus.length;i++){
        bonus=json[this.Level-1].bonus;

      }
       this.word=tempword;
       let count="";
       this.arraydata.push(possiblities);
       for(let i=0;i<possiblities.length;i++){
         count=(possiblities[i]);
         let len=possiblities[i].length;
         console.log(possiblities[i]);
         console.log("length",len);
       }
      
    }));

  }

  ionViewDidLoad(wordlen) {

    console.log('ionViewDidLoad GamestartPage');
  }

  dynamicTextBox(ran_word,arraydata,bonus)
  {
   let array=[];
    console.log("ran word",ran_word);
    console.log("arraydata",arraydata[0]);
    console.log("bonus",bonus);
    console.log("arraydata length is",arraydata.length);
    for (let i=0;i<arraydata.length;i++){
     let count= arraydata[i];
     for(let i=0;i<count.length;i++){
      console.log( this.elements.push(true));
      }this.elements.push(false);
    }
  }


  verifyWords(typedText){
    let textvalue=0;
    let splitword=[];
   splitword.push(typedText.split(""));
   console.log("+++++++++++",splitword);
    console.log("typedText length is",typedText.length);
    this.dict=(this.fetch.getDataFromApi().subscribe(json=>{
   
     let possiblities=[];
      let bonus=0;
   
    
     
       for(let i=0;i<json[0].possibilities[this.Level-1].length;i++){
        possiblities=json[this.Level-1].possibilities;
        var currentWord = json[0].possibilities[i];
       // this.elements.push(currentWord);
        //this.getute('data-word');
       // this.elements.split(",");
        console.log("current element inside ",this.elements);
        console.log("currentWord of verifywords ",currentWord);

         // if(possiblities[i]===typedText){
           // console.log("******Here i am*******",possiblities[i]);
         // }
        // }
        // for(let i=0;i<possiblities.length;i++){
        //   console.log("ffffffffffffffgggggggggggg");

        // }

         //}
       }
      

      for(let i=0;i<json[0].bonus.length;i++){
        bonus=json[this.Level-1].bonus;

      }
      
      
     
     
    }));

      }
 
  datafetching(typedText){
    
    this.dict=(this.fetch.getDataFromApi().subscribe(dictionary=>{
      console.log(dictionary);
      var obj_keys = Object.keys(dictionary);   
        var ran_word = obj_keys[Math.floor(Math.random() *obj_keys.length*5)];
       var randoms= ran_word.split('');
       console.log(randoms);
       if(typedText.length>this.word.length){
         console.log( "check your  word limit" );
       }
        else{
        
            if(dictionary.hasOwnProperty(typedText)){
            console.log(typedText+'found');
            console.log("word found");
            this.SaveData(typedText);
            this.score++;
          }
          else{
            console.log("Not Found");
          }
          
       this.typedText="";
      let totalscore=this.score;
      console.log("totalscore " +totalscore );  
        }
      }));
      
}


SaveData(typedText){
  this.angularFiredatabase.list("/FireData/").push(this.typedText);
  console.log("Data is save in FireBase"    +this.typedText);
}
arraypos=[];

checkforRandomWordgeneration(typedText,word){
  let count=0;
  let word_letters;
  this.items.push(word.split(''));
  this.fetch.getDataFromApi().subscribe(dictionary=>{
    var obj_keys = Object.keys(dictionary); 
    for(var k=0;k<obj_keys.length;k++) 
    {
      word_letters = obj_keys[k].split('');
      let matched_letter_count = 0;
      for(let l=0; l<word_letters.length; l++) 
      {  
          let  letter= word_letters[l];
          if(this.items.indexOf(letter)>-1)
          {
            //console.log(this.items.indexOf(letter)>-1);
            matched_letter_count++;
          
            if(matched_letter_count===word_letters.length)
          {
            console.log("match");
            this.wordmatched.push(letter);
          }
           
          }
          else{
            console.log("unmatched");
          }
      }
     

    }
      
   
  
    
    
  });

  }

}
