import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponentComponent } from './game-component.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameComponentComponentRoutingModule {}
