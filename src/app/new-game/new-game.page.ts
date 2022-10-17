import { Component, OnInit } from '@angular/core';
import { Question } from '../shared/question';
import { QuiestionsService } from '../shared/question-service';
@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {

  constructor(private questionService: QuiestionsService) { }
  listaQuestion = []
  probando: Promise<Question[]>
  ngOnInit() {

    this.questionService.getQuestions().then((question) => {

      this.listaQuestion = question
      console.log(this.listaQuestion)
    }
    )

  }
}
