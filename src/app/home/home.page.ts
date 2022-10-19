import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NewPlayerService } from './../shared/new-player.service';
import { DataService } from '../data.service';
import { Player } from '../shared/new-player';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  playerForm: FormGroup;
  constructor(
    private playerService: NewPlayerService,
    private router: Router,
    private fb: FormBuilder,
    private data : DataService
  ) {}
  playerList:Player[]

  ngOnInit() {
    this.playerForm = this.fb.group({
      name: [''],
      lastName: [''],
      email: [''],
      carreer: [''],
      semester: [''],
      mobile: [''],
      isWorking: ['']

    })
    this.playerService.getPlayers().then((player)=>{
      this.playerList=player
      console.log(this.playerList)
    })
  }

  exportToExcel(){
    this.data.exportToExcel(this.playerList,'Players')
  }
  
  formSubmit() {
    if (!this.playerForm.valid) {
      return false;
    } else {
      this.playerService.createNewPlayer(this.playerForm.value).then(res => {
        this.router.navigate(['/new-game']);
      })
        .catch(error => console.log(error));
    }
  }
}
