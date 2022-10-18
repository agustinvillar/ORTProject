import { Component, OnInit } from '@angular/core';
import { Answer } from '../shared/asnwer';
import { Question } from '../shared/question';
import { QuiestionsService } from '../shared/question-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {

  constructor(private questionService: QuiestionsService, private router: Router) { 
    
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
  stageName: string ="Siguiente";

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
    const index = Math.floor(Math.random() * this.questionList.length - 1);
    return index
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

    if (this.counter > this.maxQuestion -1)
    { 
      this.router.navigate(['/new-game']);

    }
    if (this.counter >= this.maxQuestion -1)
    { 
      this.stageName = "Finalizar";
    }

    else
    { 
      if (this.correctAnswer) {
        this.questionService.emitChange(false)
        setTimeout(() => {
          this.counter++;
          this.setQuestionAndAnswers()
        }, 3000);
      }
      else
      { 
        setTimeout(() => {
          this.counter++;
          this.setQuestionAndAnswers()
        }, 3000);
      }
    }
    
  }

