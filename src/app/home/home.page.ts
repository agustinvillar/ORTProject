import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NewPlayerService } from './../shared/new-player.service';
import { AlertController } from '@ionic/angular';

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
    private alertController: AlertController
  ) {}

  showSplash = false;

  ngOnInit() {
    this.playerForm = this.fb.group({
      completeName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      cedula: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      acceptsConditions : [true, [Validators.requiredTrue]]
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Términos y condiciones',
      cssClass: 'custom-alert',
      message: "" +
      "        De conformidad con la Ley N° 18.331, de Protección de Datos Personales y" +
      "      Acción de Habeas Data, de 11 de agosto de 2008 (LPDP), los datos" +
      "      suministrados los días 24 y 25 de Marzo quedaran incorporados en la Base de" +
      "      Datos UKG Uruguay, la cual será procesada exclusivamente para la finalidad" +
      "      posibles contrataciones de personal propio. Esos datos se recogerán a través de medios legítimos y sólo serán los imprescindibles para poder realizar futuras contrataciones." +
      "      Los datos personales serán tratados con el grado de protección adecuado, tomándose las" +
      "      medidas de seguridad necesarias para evitar su alteración, pérdida, tratamiento" +
      "      o acceso no autorizado por parte de terceros.",
      buttons: ['OK'],
    });

    await alert.present();
  }
  
  validation_digit(ci){
    var a = 0;
    var i = 0;
    if(ci.length <= 6){
      for(i = ci.length; i < 7; i++){
        ci = '0' + ci;
      }
    }
    for(i = 0; i < 7; i++){
      a += (parseInt("2987634"[i]) * parseInt(ci[i])) % 10;
    }
    if(a%10 === 0){
      return 0;
    }else{
      return 10 - a % 10;
    }
  }

  validate_ci(ci): Boolean{
    var dig = ci[ci.length - 1];
    return (dig == this.validation_digit(ci));
  }

  formSubmit() {
    var identityCard = document.getElementById('cedula') as HTMLFormElement
    console.log(identityCard.value)
    console.log(this.validate_ci(identityCard.value))
    if (!this.playerForm.valid || !this.validate_ci(identityCard.value)) {
      return false;
    } else {
      this.showSplash = true;
      this.playerService.createNewPlayer(this.playerForm.value).then(res => {
        this.router.navigate(['/new-game']);
      })
        .catch(error => console.log(error));
    }
  }
}
