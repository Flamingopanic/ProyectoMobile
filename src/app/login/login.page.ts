import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { StorageService } from '../Servicios/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
    username: '',
    password: '',
  };
  mensaje = '';
  spinner = false;

  constructor(
    private storage: StorageService,
    private router: Router,
    private animationController: AnimationController
  ) {}

  ngAfterContentInit() {
    this.animarLogin();
  }

  animarLogin() {
    const loginIcon = document.querySelector('.login img') as HTMLElement;
    const animacion = this.animationController.create()
      .addElement(loginIcon)
      .duration(4000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, opacity: '1', width: '200px', height: '200px' },
        { offset: 0.5, opacity: '0.5', width: '150px', height: '150px' },
        { offset: 1, opacity: '1', width: '200px', height: '200px' },
      ]);
    animacion.play();
  }

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }

  async validar() {
    try {
      const storedPassword = await this.storage.get(this.user.username);

      if (!storedPassword) {
        // Usuario no encontrado
        this.mensaje = 'Usuario no encontrado';
        return false;
      }

      if (storedPassword === this.user.password) {
        // Credenciales válidas
        this.cambiarSpinner();
        await this.storage.set('isLoggedIn', true); // Guardar estado de autenticación
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
          },
        };
        setTimeout(() => {
          this.router.navigate(['/perfil'], navigationExtras);
          this.cambiarSpinner();
          this.mensaje = '';
        }, 3000);
        return true;
      } else {
        // Contraseña incorrecta
        this.mensaje = 'Contraseña incorrecta';
        return false;
      }
    } catch (error) {
      console.error('Error en el sistema: ' + error);
      this.mensaje = 'Error en el sistema. Intente más tarde.';
      return false;
    }
  }
}
