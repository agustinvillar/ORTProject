import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GameComponentRoutingModule } from './new-game-routing.module';
import { GameComponent } from './game.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameComponentRoutingModule
  ],
  declarations: [GameComponent]
})
export class GameComponentModule {}
