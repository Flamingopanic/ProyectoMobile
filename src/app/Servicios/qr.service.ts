import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  private apiUrl = 'https://api.qrserver.com/v1/create-qr-code/';

  constructor() { }

  generateQrUrl(data: string, size: string = '150x150'): string {
    return `${this.apiUrl}?data=${encodeURIComponent(data)}&size=${size}`;
  }
}
