import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/Servicios/storage.service';

@Component({
  selector: 'app-usuario-administrador',
  templateUrl: './usuario-administrador.page.html',
  styleUrls: ['./usuario-administrador.page.scss'],
})
export class UsuarioAdministradorPage implements OnInit {
  users: any[] = []; // Inicializamos un array vacío para almacenar los usuarios

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    // Cargar la lista de usuarios cuando la página se inicializa
    this.loadUsers();
  }
  async limpiarTodo() {
    await this.storageService.limpiarTodo();  // Llama al método para limpiar todo
  }
  async loadUsers() {
    try {
      // Obtener todos los usuarios desde el storage
      const usuarios = await this.storageService.getAllUsers();
      this.users = usuarios; // Asignar la lista de usuarios a la propiedad `users`
      console.log('Usuarios cargados:', this.users); // Imprimir los usuarios en consola para verificar
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  }

  mostrarUsuarios() {
    // Mostrar los usuarios en consola
    this.storageService.verUsuariosEnConsola();
  }
}
