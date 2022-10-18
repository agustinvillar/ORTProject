import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const homePath = 'home';
const newGamePath = 'new-game';
const gameQuestionsPath = 'game-questions';

const routes: Routes = [
  {
    path: homePath,
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: newGamePath,
    loadChildren: () => import('./new-game/new-game.module').then( m => m.NewGamePageModule)
  },
  {
    path: gameQuestionsPath,
    loadChildren: () => import('./game-component/game-component.module').then( m => m.GameComponentModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
