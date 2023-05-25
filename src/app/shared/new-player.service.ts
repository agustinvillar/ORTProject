
import { Injectable } from '@angular/core';
import { NewPlayer } from '../shared/new-player';
<<<<<<< HEAD
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { getCountFromServer, query, where } from 'firebase/firestore';
=======
import { Firestore, collection, addDoc, docSnapshots } from '@angular/fire/firestore';
import { doc, getCountFromServer, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
>>>>>>> 681f952 (implemented identityCard validation)
@Injectable({
  providedIn: 'root',
})
export class NewPlayerService {

  playerName: String
  playerRef = collection(this.firestore, 'players')

  constructor(private firestore: Firestore) { }
  // Create
  createNewPlayer(player: NewPlayer) {
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
    return addDoc(this.playerRef, newPlayer)
  }

  getAmountOfPlayersByIdentityCard(identityCard: String) {
    const q = query(this.playerRef, where("identityCard", "==", identityCard))
    return getCountFromServer(q)
  }

}
