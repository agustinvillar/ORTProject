import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.scss'],
})
export class GameComponentComponent implements OnInit {
 
  questions: any
  showEndingAnimation : boolean = false;
  correctAnswers : number = 0;
  buttonTxt : string = 'Enviar respuestas';
  resultTxt : string = '¡Felicidades!';
  correctAnswersTxt : string = 'Respuestas correctas : '+this.correctAnswers;

  constructor() { }

  ngOnInit() {
      this.questions = {questiion:"Los trainees son los propios?",answers:[{answer:"Obvio pa",isCorrect:true},{answer:"nope",isCorrect:false},{answer:"masomenos",isCorrect:false},{answer:"tengo mis dudas",isCorrect:false}]}
  }

  show(){
    this.showEndingAnimation = true;
  }
}
