import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../Servicios/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    // Verifica si el usuario está autenticado
    const isLoggedIn = await this.storageService.get('isLoggedIn');
    if (!isLoggedIn) {
      this.router.navigate(['/error-acceso']); // Redirige si no está autenticado
      return false;
    }

    // Obtiene los detalles del usuario autenticado
    const currentUser = await this.storageService.get('currentUser');
    console.log('AdminGuard - currentUser:', currentUser); // Log para depuración

    // Verifica si el rol del usuario es "admin"
    if (currentUser?.role === 'admin') {
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/error-acceso']); // Redirige si no es administrador
      return false;
    }
  }
}
