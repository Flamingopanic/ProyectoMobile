import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QrService } from '../Servicios/qr.service';
import { StorageService } from '../Servicios/storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string = ''; // Asegúrate de tener esta propiedad declarada
  qrCodeUrl: string = '';

  constructor(
    private router: Router,
    private qrService: QrService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    // Acceder al estado pasado en la navegación (usando corchetes)
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['username']) {
      this.username = navigation.extras.state['username'];  // Acceso con corchetes
      console.log('Username en PerfilPage:', this.username);  // Verifica si está llegando el valor
    }
  }

  generateQrCode() {
    const data = 'https://www.ejemplo.com';
    this.qrCodeUrl = this.qrService.generateQrUrl(data);
  }

  logout() {
    this.storageService.eliminar('isLoggedIn');
    this.router.navigate(['/login']);
  }
  
}
