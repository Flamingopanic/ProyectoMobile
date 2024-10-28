import { Component } from '@angular/core';
import { QrService } from '../Servicios/qr.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  qrCodeUrl: string = "";

  constructor(private qrService: QrService) {}

  generateQrCode() {
    const data = 'https://www.ejemplo.com';
    this.qrCodeUrl = this.qrService.generateQrUrl(data);
  }
}
