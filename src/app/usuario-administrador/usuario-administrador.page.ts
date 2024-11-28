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

  async eliminarUsuario(index: number) {
    try {
      // Elimina el usuario del array
      this.users.splice(index, 1);
      // Actualiza el storage con la nueva lista de usuarios
      await this.storageService.set('usuarios', this.users);
      console.log('Usuario eliminado con éxito.');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }

  async modificarUsuario(user: any, index: number) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Modificar Usuario';
    alert.inputs = [
      {
        name: 'username',
        type: 'text',
        placeholder: 'Nombre de usuario',
        value: user.username,
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Correo electrónico',
        value: user.email,
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Contraseña',
        value: user.password,
      },
    ];
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Guardar',
        handler: async (data) => {
          if (data.username && data.email && data.password) {
            // Actualiza los datos del usuario
            this.users[index] = {
              username: data.username,
              email: data.email,
              password: data.password,
            };
            // Guarda los cambios en el storage
            await this.storageService.set('usuarios', this.users);
            console.log('Usuario modificado con éxito.');
          } else {
            console.error('Todos los campos son requeridos.');
          }
        },
      },
    ];
    document.body.appendChild(alert);
    await alert.present();
  }
  

}
