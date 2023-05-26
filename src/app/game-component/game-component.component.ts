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
      var localName = sessionStorage.getItem("name");
      this.playerName = this.playerService.playerName 
      if(this.playerName == undefined){
        this.playerName = localName
      }
      this.correctAnswers = this.questionService.counter;
      if(this.correctAnswers == 0){
        this.correctAnswers = parseInt(sessionStorage.getItem("correctAnswers"))
      }
      this.resultTxt = '¡Felicidades ' +this.playerName +'!'
      this.correctAnswersTxt = 'Respuestas correctas : '+this.correctAnswers;
  }
}
