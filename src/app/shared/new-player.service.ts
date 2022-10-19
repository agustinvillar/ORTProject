
import { Injectable } from '@angular/core';
import { Player } from '../shared/new-player';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class NewPlayerService {

  constructor(private firestore: Firestore) { }
  // Create
  createNewPlayer(player: Player) {
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
    // Add to Firestore
    return addDoc(playerRef, newPlayer)
  }

  async getPlayers(): Promise<Player[]>{
    const playerList =[]
          const querySnapshot = await getDocs(collection(this.firestore, "players"));
        querySnapshot.forEach((doc) => {
            playerList.push(doc.data())
         });
         return playerList
  }
}
