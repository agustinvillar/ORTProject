import { Component, Input, OnInit } from '@angular/core';
import { NewPlayerService } from '../shared/new-player.service';
import { QuestionsService } from '../shared/question-service';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.scss'],
})
export class GameComponentComponent implements OnInit {
 
  playerName: String =''
  questions: any
  correctAnswers : number = 0;
  buttonTxt : string = 'Enviar respuestas';
  resultTxt : string = ''
  correctAnswersTxt : string = '';

  constructor(private questionService: QuestionsService,private playerService: NewPlayerService) { }

  ngOnInit() {
      this.playerName = this.playerService.playerName
      this.correctAnswers = this.questionService.counter;
      this.resultTxt = '¡Felicidades ' +this.playerName +'!'
      this.correctAnswersTxt = 'Respuestas correctas : '+this.correctAnswers;
  }
}
