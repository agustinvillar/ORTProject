import { Injectable } from '@angular/core';
import { Question } from './question';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
    providedIn:'root',
})

  export class QuiestionsService{

    constructor(private firestore: Firestore) { }     
    
    async getQuestions(): Promise<Question[]>{

        const questionList =[]
          const querySnapshot = await getDocs(collection(this.firestore, "questions"));
        querySnapshot.forEach((doc) => {
            questionList.push(doc.data())
         });
   
    return questionList
    }
}