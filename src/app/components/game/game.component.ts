import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class GameComponent implements OnInit, OnChanges {

  @Input() question = "nada"
  @Input() answers = []

  @Output() response = new EventEmitter<boolean>()

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    console.log(this.answers)
  }

  ngOnInit() {

  }

  mostrar(isCorrect : boolean){
    console.log(isCorrect)
    this.response.emit(isCorrect)
  }



}
