import { Component, OnInit } from '@angular/core';
import { Answer } from '../shared/asnwer';
import { Question } from '../shared/question';
import { QuiestionsService } from '../shared/question-service';
@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {

  constructor(private questionService: QuiestionsService) { }
  questionList: Question[]
  question: string
  answers: Answer[]
  counter: number = 0
  gameReady: boolean = false



  ngOnInit() {
    this.questionService.getQuestions().then((question) => {
      this.questionList = question

      this.setQuestionAndAnswers()
      this.gameReady = true
    })
  }

  nextStep() {
    this.counter++
    this.setQuestionAndAnswers()
  }

  setQuestionAndAnswers() {
    const index = this.selectRandomIndex()
    this.question = this.questionList[index].question
    this.answers = this.questionList[index].answers
    this.removeQuestionFromList(index)
  }

  removeQuestionFromList(index: number) {
    this.questionList.splice(index, 1)
  }

  selectRandomIndex() {
    const index = Math.floor(Math.random() * this.questionList.length) + 1;
    return index
  }
}
