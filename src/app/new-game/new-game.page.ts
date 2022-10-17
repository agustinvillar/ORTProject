import { Component, OnInit } from '@angular/core';
import { QuiestionsService } from '../shared/question-service';
@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {

  constructor(private questionService: QuiestionsService) { }
  questionList = []
  ngOnInit() {

    this.questionService.getQuestions().then((question) => {
      this.questionList = question
      console.log(this.questionList)
    }
    )
  }
}
