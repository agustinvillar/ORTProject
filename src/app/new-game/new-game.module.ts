import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewGamePageRoutingModule } from './new-game-routing.module';

import { NewGamePage } from './new-game.page';
import { GameComponent } from '../components/game/game.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewGamePageRoutingModule,
    GameComponent
  ],
  declarations: [NewGamePage]
})
export class NewGamePageModule {}
