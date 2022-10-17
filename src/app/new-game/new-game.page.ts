import { Component, OnInit } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Question } from '../shared/question';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {

  data: Question[]
  counter: Number = 0

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getQuestions().subscribe((questions) => {
      this.data = questions
    }).unsubscribe()
  }
}
