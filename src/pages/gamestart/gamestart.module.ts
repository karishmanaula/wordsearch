import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GamestartPage } from './gamestart';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    GamestartPage,
  ],
  imports: [
    IonicPageModule.forChild(GamestartPage),
  ],
})
export class GamestartPageModule {}
