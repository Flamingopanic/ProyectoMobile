import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/Servicios/storage.service'; // Asegúrate de importar el servicio de Storage

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  qrCodeUrl: string = "";

  constructor( private storageService: StorageService) {}

  ngOnInit() {
    this.crearUsuariosBase();
  }

  // Función que crea usuarios base si no existen en el almacenamiento
  async crearUsuariosBase() {
    let usuarios = await this.storageService.get('usuarios') || []; // Obtener los usuarios almacenados

    // Verificar si ya existen usuarios
    if (usuarios.length === 0) {
      const usuariosBase = [
        { username: 'Alumno1', email: 'alumno1@duocuc.cl', password: '1', role: 'user', asistencias: [] },
        { username: 'Alumno2', email: 'alumno2@duocuc.cl', password: '1', role: 'user', asistencias: [] },
        { username: 'Profesor1', email: 'profesor1@duocuc.cl', password: '1', role: 'admin', asistencias: [] }
      ];

      // Guardar los usuarios base en el almacenamiento
      await this.storageService.set('usuarios', usuariosBase);
      console.log('Usuarios base creados');
    } else {
      console.log('Usuarios base ya existen en el storage');
    }
  }

}
