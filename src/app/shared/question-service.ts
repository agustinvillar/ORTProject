import { Injectable } from '@angular/core';
import { Question } from './question';
import { Observable } from 'rxjs';
import { Firestore, collection, getDocs, collectionData  } from '@angular/fire/firestore';

@Injectable({
    providedIn:'root',
})

  export class QuiestionsService{

    constructor(private firestore: Firestore) { }     
    
    async getQuestions(): Promise<Question[]>{

        const probando =[]
          const querySnapshot = await getDocs(collection(this.firestore, "questions"));
        querySnapshot.forEach((doc) => {
          //  console.log(doc.id, " => ", doc.data());
            probando.push(doc.data())
         });
   
    return probando
    }
}