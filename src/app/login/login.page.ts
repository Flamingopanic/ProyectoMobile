import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { StorageService } from '../Servicios/storage.service';

// Definición del tipo Usuario
interface Usuario {
  username: string;
  password: string;
  email: string;
  role: string;
}

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
      // Obtener la lista de usuarios almacenados
      const usuarios: Usuario[] = await this.storage.get('usuarios') || [];

      // Buscar el usuario por nombre de usuario
      const usuario = usuarios.find(u => u.username === this.user.username);

      if (!usuario) {
        // Usuario no encontrado
        this.mensaje = 'Usuario no encontrado';
        return false;
      }

      if (usuario.password === this.user.password) {
        // Credenciales válidas
        this.cambiarSpinner();
        await this.storage.set('isLoggedIn', true); // Guardar estado de autenticación

        // Guardar el usuario completo en el almacenamiento como currentUser
        await this.storage.set('currentUser', usuario); // <-- Aquí se guarda el usuario autenticado

        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            role: usuario.role, // Pasar el rol como estado de navegación
          },
        };

        setTimeout(() => {
          // Redirigir según el rol del usuario
          if (usuario.role === 'admin') {
            this.router.navigate(['/usuario-administrador'], navigationExtras); // Página para administradores
          } else {
            this.router.navigate(['/perfil'], navigationExtras); // Página para usuarios normales
          }
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
