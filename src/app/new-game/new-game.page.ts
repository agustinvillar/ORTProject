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
  note: string

  disableButton = true
  correctAnswer: boolean
  randomNumbers = []
  maxQuestion: number = 3;
  gameReady: boolean = false
  stageName: string = "Continuar";
  timeout = 3000

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
      this.note = this.questionList[index].note
      this.answers = this.questionList[index].answers
      this.child.resetColors();
      this.randomNumbers.push(index)
      this.child.hideNote();
    }, this.timeout);

  }

  setQuestionAndAnswersWithoutTimeout() {
    let index = this.selectRandomIndex()
    while (this.randomNumbers.includes(index)) {
      index = this.selectRandomIndex()
    }
    this.question = this.questionList[index].question
    this.note = this.questionList[index].note
    this.answers = this.questionList[index].answers
    this.child.resetColors();
    this.randomNumbers.push(index)
  }

  nextStep() {
    this.questionService.emitToggleButton(true)
    this.child.changeColors();
    this.child.showNoteMethod();
  
    
    if (this.stageName === "Continuar") {

      if (this.correctAnswer) {
        this.disableButton = true
        this.questionService.addCounter();
        this.questionService.emitChange(false)
      } else {
        this.disableButton = true
      }
      this.setQuestionAndAnswers();
      this.counter ++;
      if (this.counter == this.maxQuestion) {
        this.stageName = "Continuar"
        setTimeout(() => {
          this.router.navigate(['/game-questions']);
        }, this.timeout-500);
      }
    }
  }
}
