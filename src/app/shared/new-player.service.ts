
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
    const newPlayer = {
      completeName: player.completeName,
      email: player.email,
      mobile: player.mobile,
      edad: player.edad,
      formacion: player.formacion,
      especializacion: player.especializacion,
      acceptsConditions: player.acceptsConditions
    }
    this.playerName = player.completeName
    // Add to Firestore
    return addDoc(playerRef, newPlayer)
  }
}
