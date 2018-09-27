 import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import{ PlaysearchPage } from '../pages/playsearch/playsearch';
import { FetchApiProvider } from '../providers/fetch-api/fetch-api';
import{ GamestartPage} from '../pages/gamestart/gamestart';

import { IonicStorageModule } from '@ionic/storage';
import { DatabaseProvider } from '../providers/database/database';
import{AngularFireModule} from 'angularfire2';
import{AngularFireDatabaseModule} from 'angularfire2/database';


var config = {
  apiKey: "AIzaSyBfhGHq1QWAmQaLU7HKI8ZntY1n_MZJnhk",
  authDomain: "wordgame-b3956.firebaseapp.com",
  databaseURL: "https://wordgame-b3956.firebaseio.com",
  projectId: "wordgame-b3956",
  storageBucket: "wordgame-b3956.appspot.com",
  messagingSenderId: "429576713332"
};


@NgModule({
  declarations: [
    MyApp, 
    HomePage,
    PlaysearchPage,
    GamestartPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),

    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlaysearchPage,
    GamestartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FetchApiProvider,
    DatabaseProvider
  ]
})
export class AppModule {}
