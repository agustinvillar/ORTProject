import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private firestore: Firestore) { }

  getQuestions() : Observable<Question[]>{
    const questionsRef = collection(this.firestore, 'questions')
    return collectionData(questionsRef) as Observable<Question[]>
  }
}
