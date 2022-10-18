import { Component, OnInit } from '@angular/core';
import { Answer } from '../shared/asnwer';
import { Question } from '../shared/question';
import { QuestionsService } from '../shared/question-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {

  constructor(private questionService: QuestionsService, private router: Router) {

  }
  questionList: Question[]
  question: string
  answers: Answer[]
  counter: number = 0

  disableButton = true
  correctAnswer: boolean
  randomNumbers = []
  maxQuestion: number = 3;
  gameReady: boolean = false
  stageName: string = "Siguiente";

  ngOnInit() {
    this.questionService.getQuestions().then((question) => {
      this.questionList = question
      console.log(this.questionList)

      this.setQuestionAndAnswers()

      this.questionService.changeEmitted$.subscribe(data => {
        this.correctAnswer = data
        this.disableButton = false

      })
    })
  }

  removeQuestionFromList(index: number) {
    this.questionList.splice(index, 1)
  }

  selectRandomIndex() {
    const index = Math.floor(Math.random() * this.questionList.length);
    return index
  }

  setQuestionAndAnswers() {
    let index = this.selectRandomIndex()
    while (this.randomNumbers.includes(index)) {
      index = this.selectRandomIndex()
    }
    this.disableButton = false
    this.question = this.questionList[index].question
    this.answers = this.questionList[index].answers
    this.randomNumbers.push(index)
    console.log(index)
    console.log(this.randomNumbers)
  }

  nextStep() {
    this.counter++
    console.log(this.counter, this.maxQuestion)
    if (this.correctAnswer) {
      this.disableButton = true
      this.questionService.addCounter();
      console.log(this.questionService.counter)
      this.questionService.emitChange(false)
      setTimeout(() => {
        var last = this.checkItsLastQuestion();
        if (!last){
          this.setQuestionAndAnswers()
        }
      }, 3000);
    } else {
      this.disableButton = true
      setTimeout(() => {
        var last = this.checkItsLastQuestion();
        if (!last){
          this.setQuestionAndAnswers()
        }
      }, 3000);
    }
  }

  private checkItsLastQuestion() : boolean {
    if (this.counter == this.maxQuestion) {
      console.log('llegue');
      this.stageName = "Finalizar";
      return false;
    }
    if (this.counter > this.maxQuestion) {
      console.log('llegue');
      this.router.navigate(['/game-questions']);
      return true;
    }
  }
}
