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
  timeout = 5000

  ngOnInit() {
    this.questionService.getQuestions().then((question) => {
      this.questionList = question
      console.log(this.questionList)

      this.setQuestionAndAnswers()

      this.questionService.changeEmitted$.subscribe(data => {
        this.correctAnswer = data
      })

      this.questionService.buttonValue$.subscribe(value => {
        this.disableButton = value
      })
      this.questionService.emitToggleButton(true)

      console.log(this.disableButton)
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
      console.log(index)
      console.log(this.randomNumbers)
    }, this.timeout);

  }

  nextStep() {
    this.questionService.emitToggleButton(true)
    this.child.changeColors();

    if (this.stageName === "Siguiente") {
      console.log('entre en siguiente')

      if (this.correctAnswer) {
        console.log('está correcto correcto, esperar 4 segundos')
        
        this.setQuestionAndAnswers()

      } else {
        console.log('no está correcto, esperar 4 segundos')
        this.setQuestionAndAnswers()
      }

      

      if (this.counter === this.maxQuestion) {
        this.stageName = "Finalizar"
        
      }

      this.counter++
      console.log(this.counter, this.maxQuestion)
      if (this.correctAnswer) {
        this.disableButton = true
        this.questionService.addCounter();
        console.log(this.questionService.counter)
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
      console.log('llegue, esperar 5');
      setTimeout(() => {
        this.router.navigate(['/game-questions']);
        
      }, this.timeout);
    }

  }
}
