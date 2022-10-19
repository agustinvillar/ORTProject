import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NewPlayerService } from './../shared/new-player.service';

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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.playerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      carreer: ['', [Validators.required]],
      semester: ['', [Validators.required, Validators.max(10), Validators.min(1)]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      isWorking: ['true', [Validators.required]]
    })
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
