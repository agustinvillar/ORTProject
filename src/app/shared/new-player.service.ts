
import { Injectable } from '@angular/core';
import { NewPlayer } from '../shared/new-player';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class NewPlayerService {

  playerName: String

  constructor(private firestore: Firestore) { }
  // Create
  createNewPlayer(player: NewPlayer) {
    const playerRef = collection(this.firestore, 'players')
    console.log(player);
    const newPlayer = {
      name: player.name,
      email: player.email,
      mobile: player.mobile,
      lastName: player.lastName,
      carreer: player.carreer,
      semester: player.semester,
      isWorking: player.isWorking
    }
    this.playerName = player.name
    // Add to Firestore
    return addDoc(playerRef, newPlayer)
  }
}
