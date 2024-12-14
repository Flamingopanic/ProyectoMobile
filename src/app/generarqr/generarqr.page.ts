import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generarqr',
  templateUrl: './generarqr.page.html',
  styleUrls: ['./generarqr.page.scss'],
})
export class GenerarqrPage implements OnInit {

  qrText = 'Asistencia';

  constructor() { }

  ngOnInit() {
  }

}
