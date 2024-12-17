import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generarqr',
  templateUrl: './generarqr.page.html',
  styleUrls: ['./generarqr.page.scss'],
})

export class GenerarqrPage implements OnInit {
  qrText: string;
  classId: string = 'Asignatura';  // Ejemplo de ID de clase
  username: string = 'usuario';  // Este valor puede ser obtenido de un servicio de usuario logueado

  constructor() {
    this.qrText = `${this.classId}\n${new Date().toLocaleDateString()}`; // Solo muestra la fecha, no la hora

  }

  ngOnInit() {}

}
