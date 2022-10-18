import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameComponentComponentRoutingModule } from './new-game-routing.module';
import { GameComponentComponent } from './game-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameComponentComponentRoutingModule
  ],
  declarations: [GameComponentComponent]
})
export class GameComponentModule {}
