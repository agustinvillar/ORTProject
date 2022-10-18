import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { QuiestionsService } from 'src/app/shared/question-service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class GameComponent implements OnInit {

  @Input() question = "nada"
  @Input() answers = []

  constructor(private questionService: QuiestionsService) { }

  ngOnInit() {

  }

  mostrar(isCorrect: boolean) {
    this.questionService.emitChange(isCorrect)
  }

}
