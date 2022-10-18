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
  disableButton = true
  correctAnswer: boolean
  randomNumbers = []

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

  nextStep() {
    if (this.correctAnswer) {
      console.log('responde bien, suma 1')
      this.questionService.addCounter();
      console.log(this.questionService.counter)
      this.questionService.emitChange(false)
      setTimeout(() => {
        this.counter++
        this.setQuestionAndAnswers()
      }, 3000);
    }else{
      console.log('responde mal, pasa a la siguiente')
      console.log(this.questionService.counter)
      setTimeout(() => {
        this.counter++
        this.setQuestionAndAnswers()
      }, 3000);
    }
  }

  setQuestionAndAnswers() {
    let index = this.selectRandomIndex()
    while(this.randomNumbers.includes(index)){
      index = this.selectRandomIndex()
    }
    console.log(this.randomNumbers)
    this.question = this.questionList[index].question
    this.answers = this.questionList[index].answers
    this.randomNumbers.push(index)
  }

  removeQuestionFromList(index: number) {
    this.questionList.splice(index, 1)
  }

  selectRandomIndex() {
    const index = Math.floor(Math.random() * this.questionList.length - 1);
    return index
  }
}
