import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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
  @Input() answers = []

  constructor(private questionService: QuestionsService) { }

  ngOnInit() {

  }

  setAnswer(isCorrect: boolean) {
    let current = this.question
    this.questionService.emitToggleButton(false)
    this.questionService.emitChange(isCorrect)
  }

}
