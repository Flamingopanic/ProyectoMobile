import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/Servicios/storage.service';

@Component({
  selector: 'app-lista-asistencias',
  templateUrl: './lista-asistencias.page.html',
  styleUrls: ['./lista-asistencias.page.scss'],
})
export class ListaAsistenciasPage implements OnInit {
  usuarios: any[] = []; // Lista de usuarios filtrados con rol "user"

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    await this.cargarUsuarios();
  }

  async cargarUsuarios() {
    try {
      const todosLosUsuarios = await this.storageService.getAllUsers(); // Obtiene todos los usuarios
      // Filtra los usuarios que tienen el rol "user"
      this.usuarios = todosLosUsuarios.filter(user => user.role === 'user');
      console.log('Usuarios con rol "user":', this.usuarios);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  }
}
