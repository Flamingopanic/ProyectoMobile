import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../Servicios/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  /* Objeto JSON para usuario */
  user = {
    username: '',
    password: '',
  };
  /* mensaje de respuesta */
  mensaje = '';
  /* Estado de carga */
  spinner = false;

  constructor(
    private storage: StorageService, 
    private router: Router,
    private animationController: AnimationController) 
     {


  }
  ngAfterContentInit() {
    this.animarLogin();
  }
  animarLogin() {
    /* seleccionamos el item desde el Front con un query selector y reconocemos el elemento como HTMLElement para que sea compatible con la animacion */
    const loginIcon = document.querySelector(".login img") as HTMLElement;
    /* Creamos y configuramos la animacion */
    const animacion = this.animationController.create()
      .addElement(loginIcon)
      .duration(4000)
      .iterations(Infinity)
      /* la configuracion de keyframe permite editar el diseño segun el tiempo de la animacion empezando desde 0 hasta 1 usando los decimales(0.5,0.25 ,0.2) */
      .keyframes([
        { offset: 0, opacity: '1', width: "200px", height: "200px" },
        { offset: 0.5, opacity: '0.5', width: "150px", height: "150px" },
        { offset: 1, opacity: '1', width: "200px", height: "200px" }
      ]);
    animacion.play();
  }

  /* NGIF = permite realizar una validacion entre html y ts validando que la variable sea true o false */
  /* Permite cambiar el valor por defecto del spinner y comprobarlo con ngIF */
  cambiarSpinner() {
    this.spinner = !this.spinner;
  }
  validar() {
    return this.storage
      .get(this.user.username)
      .then((res) => {
        //Si funciona me devuelve el usuario completo
        if (res === this.user.password) {
          this.cambiarSpinner();
          let navigationExtras: NavigationExtras = {
            state: {
              username: this.user.username,
              password: this.user.password,
            },
          };
          setTimeout(() => {
            this.router.navigate(['/perfil'], navigationExtras);
            this.cambiarSpinner();
            this.mensaje = "";
          }, 3000);
          return true;
        } else {
          console.log('Contraseña vacía');
          this.mensaje = 'Contraseña vacía';
          return false;
        }
      })
      .catch((error) => {
        console.log('Error en el sistema: ' + error);
        return false;
      });
  }
  


}

