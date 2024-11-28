import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Servicios/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user = {
    username: "",
    email: "",
    password: ""
  };

  constructor(private storage: StorageService, private router: Router) { }

  ngOnInit() {}

  async registrar() {
    try {
      // Validación de campos
      if (!this.user.username || !this.user.email || !this.user.password) {
        console.error("Todos los campos son requeridos.");
        return;
      }

      // Primero, obtener la lista de usuarios guardados
      let usuarios = await this.storage.get('usuarios') || []; // Si no hay usuarios, inicializamos un array vacío

      // Añadir el nuevo usuario al array
      usuarios.push(this.user);

      // Verificar que el usuario se ha añadido correctamente antes de guardar
      console.log('Usuarios antes de guardar:', usuarios);

      // Guardar el array actualizado en el Storage
      await this.storage.set('usuarios', usuarios);

      // Redirigir a la página de login o donde se desee
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  }
}
