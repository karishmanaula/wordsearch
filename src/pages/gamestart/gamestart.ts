import { Component, TemplateRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FetchApiProvider } from '../../providers/fetch-api/fetch-api';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import{AngularFireDatabase} from 'angularfire2/database';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';


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
  obj_keys;
  constructor(public navCtrl: NavController, private angularFiredatabase:AngularFireDatabase,public navParams: NavParams,public http:HttpClient,private fetch:FetchApiProvider,private storage: Storage) {
   
      this.dict=(this.fetch.getDataFromApi().subscribe(dictionary=>{
        console.log(dictionary);
        this. obj_keys = Object.keys(dictionary);   
       
        this. ran_word =this. obj_keys[Math.floor(Math.random() * this.obj_keys.length)];
       // var ran_word = obj_keys[Math.floor(Math.random() * 5)];
         console.log(this.ran_word);
         console.log("hello");
          this.word=this.ran_word;
          //var splitword=ran_word.split("");
          
         // console.log(splitword);
          console.log(this.word);
          console.log("finish");  
          console.log("");

         
        









        //  this.checkforRandomWordgeneration(this.ran_word); 
        /*  let len=splitword.length;
          let temp:any="";
          console.log("split word length "+len); 
          for(let i=0;i<splitword.length-1;i++){
          var arraylength= Math.floor(Math.random() * (len-1+0)) + 0;
          
          console.log("Indices for random word"+ arraylength );
          //tempword+this.push(splitword[arraylength]);
          console.log("word at the random position "+splitword[arraylength]);
          temp+=splitword[arraylength];
          console.log("word formed for shufling  "+temp);
          }
          var wordfor=[Math.floor(Math.random()*splitword.length)];
          console.log("wordFormation to run for loop "+wordfor );
          var arrayfor="";
          for(let i=0;i<wordfor.length;i++)
          {
             arrayfor+=splitword[arraylength];
          }
          console.log("Value For arrayfor "+arrayfor);
           var index=[Math.floor(Math.random()*splitword.length)];
           console.log("Index of array" +index);
            
          for(let i=0;i<splitword.length;i++){

          }*/
        })); 


        this.angularFiredatabase.list("/FireData/").subscribe(data=>{
          this.arraydata=data;
          console.log(this.arraydata);
        }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamestartPage');
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
        var ran_word = obj_keys[Math.floor(Math.random() * obj_keys.length)];
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
  console.log("Data is save in FireB  ase"    +this.typedText);
}
arraypos=[];

//checkforRandomWordgeneration(typedText,word)
 // {
        
        //console.log(ran_word);
       // var splitword=ran_word.split("");
        //console.log(splitword);
         
      
       // console.log("+++++++++++++++++++++++++++++++++++++++++++++++");   
       // let len=splitword.length;
       // let leng=0;
       // let arraylength=0;
       
       // let num= Math.floor(Math.random()*(len-1+2))+2;
        
      /*  for(let i=0;i<num;i++) 
        {
          var ran_letter=splitword[Math.floor(Math.random()*splitword.length)];
          
          this.temp+=ran_letter;
        }*/
        //console.log("length of random word "+this.temp.length);

      //  console.log("*******random letter********"+ this.temp);
       // this.fetch.getDataFromApi().subscribe((dictionary)=>{
        //  var obj_keys = Object.keys(dictionary); 
         
        // var ranwords = obj_keys[Math.floor(Math.random() * obj_keys.length)];
        // console.log("Second Random word is "+ranwords);  
      

         /* if(dictionary.hasOwnProperty(this.temp)){
            console.log("data is present +"+this.temp);
          }
          else{
            console.log("we need to shuffle the word");
            console.log("tempword    "+this.temp);

            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            for(let i=0;i<this.temp.length;i++){
          
            this.shuffledword1=this.shuffelWord(this.temp);
            
          // this.arraytemp.push(this.shuffelWord);

            }
            console.log("shuffleword   "  +this.shuffledword1);

          }*/
        //});




       /* for(let i=0;i<splitword.length;i++){
         arraylength= Math.floor(Math.random() * (len-1+0)) + 0;
        this.arraypos.push(splitword[arraylength]);
        console.log("==============="+this.arraypos);
        console.log(arraylength);
          if(this.arraypos[i+1]!==this.arraypos[i])
          { console.log("we are here");
          this .temp+=splitword[arraylength];
          console.log(this.temp);
           
          }
          else{
           
          }*/
      
        
       /* console.log("***************************************************");
        let n=Math.floor(Math.random()*this.temp.length);
       
        for(let i=0;i<n;i++){
          this.fetch.getDataFromApi().subscribe((dictionary)=>{
         this. dictionarydata= Object.keys(dictionary); 
         if(this.temp==this.dictionarydata){
           console.log("Word found");

         }
         else{
           console.log("Need to Shuffle the word " + this.temp);
           console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
           var shuffledword=this.shuffelWord(this.temp);
           console.log("shuffleword"+shuffledword);

          // this.checkforRandomWordgeneration(this.temp);
         }
          });


     
      
}*/   
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

checkforRandomWordgeneration(typedText,word)
{
  console.log("text we typed in the textbox "+typedText);
  console.log("Our Word from dictionary "+word );
  let len=word.length;

  let num= Math.floor(Math.random()*(len-1+2)+2);
  console.log("Random number Value is "+ num);
  console.log("len "+len);
  
    if(typedText.length>=2)
    {
        if(word.indexOf(typedText))
        {
          this.fetch.getDataFromApi().subscribe(dictionary=>{
    
       
            if(dictionary.hasOwnProperty(typedText)){
              console.log("word found");
            }
            else{
              console.log("word not found");
            }
          });
          
        }
    }
    
     
    
  
}
}