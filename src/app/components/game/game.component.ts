import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Answer } from 'src/app/shared/asnwer';
import { QuestionsService } from 'src/app/shared/question-service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class GameComponent implements OnInit {

  @Input() question = ""
  @Input() note = ""
  @Input() answers: Answer[] = []

  red = '#ffb3b3';
  green = '#b3ffb3';
  white = 'transparent';

  private buttonColor: string[] = [];

  showNote = false;

  constructor(private questionService: QuestionsService) { }

  ngOnInit() {
    this.resetColors();
  }

  changeColors() {
    if (this.answers != undefined) {
      for (var i = 0; i < this.answers.length; i++) {
        if (this.answers[i].isCorrect) {
          this.buttonColor[i] = this.green;
        }
        else{
          this.buttonColor[i] = this.red;
        }
      }
    }
  }

  resetColors() {
    for (var i = 0; i < 15; i++) {
      this.buttonColor[i] = this.white;
    }
  }

  showNoteMethod(){
    if(this.note != ""){
      this.showNote = true;
    }
  }

  hideNote(){
    this.showNote = false;
  }

  setAnswer(isCorrect: boolean) {
    this.questionService.emitToggleButton(false)
    this.questionService.emitChange(isCorrect)
  }

}
