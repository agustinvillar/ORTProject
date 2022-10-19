import { Component, OnInit, ViewChild } from '@angular/core';
import { Answer } from '../shared/asnwer';
import { Question } from '../shared/question';
import { QuestionsService } from '../shared/question-service';
import { Router } from '@angular/router';
import { GameComponent } from '../components/game/game.component';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {

  constructor(private questionService: QuestionsService, private router: Router) {

  }

  @ViewChild(GameComponent) child: GameComponent;
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
  timeout = 2500

  ngOnInit() {
    this.questionService.getQuestions().then((question) => {
      this.questionList = question

      this.setQuestionAndAnswersWithoutTimeout()

      this.questionService.changeEmitted$.subscribe(data => {
        this.correctAnswer = data
      })

      this.questionService.buttonValue$.subscribe(value => {
        this.disableButton = value
      })
      this.questionService.emitToggleButton(true)

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
    setTimeout(() => {
      let index = this.selectRandomIndex()
      while (this.randomNumbers.includes(index)) {
        index = this.selectRandomIndex()
      }
      this.question = this.questionList[index].question
      this.answers = this.questionList[index].answers
      this.child.resetColors();
      this.randomNumbers.push(index)
    }, this.timeout);

  }

  setQuestionAndAnswersWithoutTimeout() {
    let index = this.selectRandomIndex()
    while (this.randomNumbers.includes(index)) {
      index = this.selectRandomIndex()
    }
    this.question = this.questionList[index].question
    this.answers = this.questionList[index].answers
    this.child.resetColors();
    this.randomNumbers.push(index)
  }

  nextStep() {
    this.questionService.emitToggleButton(true)
    this.child.changeColors();

    if (this.stageName === "Siguiente") {

      if (this.correctAnswer) {

        this.setQuestionAndAnswers()

      } else {
        this.setQuestionAndAnswers()
      }



      if (this.counter === this.maxQuestion) {
        this.stageName = "Finalizar"

      }

      this.counter++
      if (this.correctAnswer) {
        this.disableButton = true
        this.questionService.addCounter();
        this.questionService.emitChange(false)
        // setTimeout(() => {
        //   this.checkItsLastQuestion();
        // }, 3000);
      } else {
        this.disableButton = true
        // setTimeout(() => {
        //   this.checkItsLastQuestion();
        //   this.setQuestionAndAnswers()
        // }, 3000);
      }
    }

    if (this.counter > this.maxQuestion) {
      setTimeout(() => {
        this.router.navigate(['/game-questions']);

      }, this.timeout);
    }

  }
}
