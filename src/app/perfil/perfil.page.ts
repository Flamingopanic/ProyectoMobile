import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QrService } from '../Servicios/qr.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  
  username = '';
  qrCodeUrl: string = ""; 

  constructor(private router: Router, private qrService: QrService) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: '';
      password: '';
    };
    this.username = state?.username || ''; 
  }

  generateQrCode() {
    const data = 'https://www.ejemplo.com';
    this.qrCodeUrl = this.qrService.generateQrUrl(data);
  } 

  ngOnInit() {}
}
