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
    password: "",
    role: "user",
    asistencias: [] 
  };

  constructor(private storage: StorageService, private router: Router) { }

  ngOnInit() {}

  async registrar() {
    try {
      // Validación de campos
      if (!this.user.username || !this.user.email || !this.user.password || !this.user.role) {
        console.error("Todos los campos son requeridos.");
        return;
      }

      // Obtener la lista de usuarios guardados
      let usuarios = await this.storage.get('usuarios') || []; // Si no hay usuarios, inicializamos un array vacío

      // Añadir el nuevo usuario al array
      usuarios.push(this.user);
      console.log('Usuario registrado:', this.user);
      
      // Guardar el array actualizado en el Storage
      await this.storage.set('usuarios', usuarios);

      console.log('Usuario registrado exitosamente:', this.user);

      // Redirigir a la página de login
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  }
}
