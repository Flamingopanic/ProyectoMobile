import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../Servicios/storage.service'; // Usa servicio de almacenamiento

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    // Verifica si el usuario está autenticado
    const isLoggedIn = await this.storageService.get('isLoggedIn');

    if (isLoggedIn) {
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/error-acceso']); // Redirige al login si no está autenticado
      return false;
    }
  }
}
