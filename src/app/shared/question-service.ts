import { Injectable } from '@angular/core';
import { Question } from './question';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
    providedIn:'root',
})

  export class QuiestionsService{

    constructor(private firestore: Firestore) { }  
    
    private emitChangeSource = new Subject<any>()
    changeEmitted$ = this.emitChangeSource.asObservable()
    counter = 0

    emitChange(change: any){
      this.emitChangeSource.next(change)
    }

    addCounter(){
      this.counter++
    }

    resetCounter(){
      this.counter = 0;
    }
    
    async getQuestions(): Promise<Question[]>{

        const questionList =[]
          const querySnapshot = await getDocs(collection(this.firestore, "questions"));
        querySnapshot.forEach((doc) => {
            questionList.push(doc.data())
         });
         console.log(questionList)
   
    return questionList
    }
}