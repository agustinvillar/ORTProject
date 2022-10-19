import { Component, Input, OnInit } from '@angular/core';
import { QuestionsService } from '../shared/question-service';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.scss'],
})
export class GameComponentComponent implements OnInit {
 
  questions: any
  correctAnswers : number = 0;
  buttonTxt : string = 'Enviar respuestas';
  resultTxt : string = '¡Felicidades!';
  correctAnswersTxt : string = '';

  constructor(private questionService: QuestionsService) { }

  ngOnInit() {
      this.correctAnswers = this.questionService.counter;
      this.correctAnswersTxt = 'Respuestas correctas : '+this.correctAnswers;
  }
}
