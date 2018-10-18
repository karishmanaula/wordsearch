import { Component, TemplateRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FetchApiProvider } from '../../providers/fetch-api/fetch-api';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import{AngularFireDatabase} from 'angularfire2/database';
import { shimContentAttribute } from '@angular/platform-browser/src/dom/dom_renderer';
import { Element } from '@angular/compiler';


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

  arraytemp=[];
  shuffledword1="";
  obj_keys=[];
  obj_values=[];
  tempword="";

  
  constructor(public navCtrl: NavController, private angularFiredatabase:AngularFireDatabase,public navParams: NavParams,public http:HttpClient,private fetch:FetchApiProvider,private storage: Storage) {
   let j=0;
      this.dict=(this.fetch.getDataFromApi().subscribe(dictionary=>{
      
     // this.obj_keys = Object.keys(dictionary); 
     // console.log(this.obj_keys);
 
      this.obj_values=Object.entries(dictionary); 
      this.obj_keys=Object.values(dictionary);
      console.log("value----> ",this.obj_keys);
      
      // for (let val of Object.values(dictionary)) {
      //   console.log(val);
      // }

      // for(let i in this.obj_keys){
      //   let temp=[];
      //   for(let j in this.obj_keys[i] )
      //   {
      //     temp.push(this.obj_keys[i][j]);
      //   }
      //   this.arraydata.push(temp);
      // }
     // console.log(this.obj_keys);
  
    }));
      // for(let i=0;i<this.obj_keys.length;i++)let
      // {
      //   for (let i in a) {
      //     let temp = [];
      //     for (let j in a[i]) {
      //       temp.push(a[i][j]);
      //     }
      //     array.push(temp);
      //   }
       
       
        // this.tempword=this.obj_keys[i];
        // for(let j=0;j<Object.keys(this.tempword).length;j++){
        // console.log("value of keys ",Object.keys(this.tempword));
        // }
       
        // let j=0;
        // this.tempword=this.obj_keys[j];
        // this.word=this.tempword;
        
        // console.log(this.arraydata);
       
        // j++;
        
      console.log(this.dict);
        
      }
   
      // for(let i=0;i<dictionary[i].length;i++){
      //  this. tempword+=dictionary[i];
      // }
      // console.log(this.tempword);
      // this.word=this.tempword; 
       
      //  this. ran_word =this. obj_keys[Math.floor(Math.random() * this.obj_keys.length)];
      //  this.wordlen=this.ran_word.length;
      //  console.log("length of random word ", this.wordlen);
      //  this.word=this.ran_word;
      // this.dynamicTextBox(this.wordlen,this.ran_word);

      //  console.log("");
        
      //   })); 
       /* this.angularFiredatabase.list("/FireData/").subscribe(data=>{
        this.arraydata=data;
        console.log(this.arraydata);
        }); */
        // this.dynamicTextBox(this.tempword,this.tempword.length)
  //}

  ionViewDidLoad(wordlen) {
    console.log('ionViewDidLoad GamestartPage');
  }

  dynamicTextBox(ran_word,wordlen)
  {
   
    let value=[];
    let count;
    let currentWordLength:any;
    for(let i=0;i<wordlen;i++)
    {
    currentWordLength=Math.floor(Math.random()*(wordlen-2))+2;
    console.log(currentWordLength);
   
    
    if(currentWordLength!==0)
    {
     // c++;
     this.items.push(currentWordLength); 
    }
     
   
    }
    for(let i=0;i<this.items.length;i++){
      this.items.sort();
    }
  
    console.log("sorted array value",this.items);
    for(let i=0;i<this.items.length;i++){
      count=this.items[i]
      console.log("count",count);
      for(let i=0;i<count;i++){
        this.elements.push(true);
      }
      this.elements.push(false);
    }

   




  //   console.log("Value for count",c);
  //   console.log("value of items array",this.items);
  //   value.push(this.items);
  //   console.log("elements inside value array is",value);
  //   for(let i=0; i<value.length;i++){
  //     count=value[i];
  //     for(i=0;i<count;i++)
  //   this.elements.push(true);
  // }
  // this.elements.push(false);
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
        
          
          for (let i=0;i<this.wordmatched.length;i++) {
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
       
       
         
          if((typedText.length>this.word.length)||(typedText.length<1)){
              console.log(" check the word limit");
              return;
          }
   
          for(let i=0;i<data[0].words.length;i++) {
            if(typedText===data[0].words[i]) {

                wordfound=true;
                 this.items.push(typedText); 
               
               
            }
           
          }
   
          console.log(wordfound);
        
          if(wordfound===true) {  
                  console.log("word is matched");
                  this.wordmatched.push(this.typedText);
                  this.score++;
                  console.log(this.score);   
                  console.log(this.wordmatched);
        
                
                  //if(data[0].words.length===this.wordmatched.length){
                 
                    //this.goToNext();
                 
                 
            // }
          }
         if((wordfound===false) && (typedText !== "")) {
            console.log('inside missing word');
              this.dict=(this.fetch.getData().subscribe(dictionary=>{
                    console.log('===============================');
                    console.log(dictionary);
                    console.log('===============================');
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
                    console.log(this.bonus);
                    
              }));
              
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


 // }
/*  shuffelWord (temp){
  
    var shuffledWord = '';
    var words  = temp.split('');
    console.log("***words are inside  shuffle***" +words);
    while (words.length > 0) {
      shuffledWord +=  words.splice(words.length * Math.random() << 0, 1);
    }
    return shuffledWord;


}*/


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
           
            //this.wordmatched.push(letter);
          
          }
          else{
            console.log("unmatched");
          }
          
          
          
          // match if this letter exists in main array of circle gesture
          // if matched matched_letter_count++
          // if word_letters.length == matched_letter_count its a match push it in a saperate array
          // don't consider words having length 1
     // }
    
      }
      //console.log("kkkkkkkkkkk" ,word_letters);

    }
      
   
  
    
    
  });

  }

}
