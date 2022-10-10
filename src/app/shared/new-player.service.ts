
import { Injectable } from '@angular/core';
import { NewPlayer } from '../shared/new-player';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class NewPlayerService {
  playerListRef: AngularFireList<any>;
  constructor() {}
  // Create
  createNewPlayer(player: NewPlayer) {
    console.log(player);
    return this.playerListRef.push({
      name: player.name,
      email: player.email,
      mobile: player.mobile,
      lastName: player.lastName,
      carreer: player.carreer,
      semester: player.semester,
      isWorking: player.isWorking
    });
  }

  
}