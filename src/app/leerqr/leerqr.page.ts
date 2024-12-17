import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, ToastController, AlertController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { StorageService } from 'src/app/Servicios/storage.service';

@Component({
  selector: 'app-leerqr',
  templateUrl: './leerqr.page.html',
  styleUrls: ['./leerqr.page.scss'],
})
export class LeerqrPage implements OnInit {

  scanResult = ''; // Variable donde se almacena el resultado del QR escaneado

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private toastController: ToastController,
    private alertController: AlertController,
    private storageService: StorageService // Servicio para manejar almacenamiento
  ) { }

  ngOnInit(): void {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners().then();
    }
  }

  // Función para iniciar el escaneo del QR
  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        lensFacing: LensFacing.Back
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.scanResult = data?.barcode?.displayValue;

      // Llamar a la función para registrar la asistencia con la información del QR escaneado
      this.registrarAsistencia(this.scanResult);
    }
  }

  // Función para registrar la asistencia
  private async registrarAsistencia(qrData: string) {
    try {
      // Extraemos la información del QR escaneado
      const [classId, fecha] = qrData.split('|'); // Separar la classId y la fecha que están en el QR

      // Crear el objeto de asistencia con la información del QR
      const asistencia = {
        classId: classId,  // ID de la clase del QR
        date: fecha, // Fecha obtenida del QR (sin la hora)
        course: classId, // Asignamos classId también como el nombre del curso
        user: '' // Este campo se llenará con el nombre del usuario que escaneó el QR
      };

      // Obtener el usuario actual (suponiendo que esté guardado en el storage)
      const currentUser = await this.storageService.get('currentUser');

      if (currentUser && currentUser.username) {
        // Si el usuario está logueado, lo asignamos al campo 'user'
        asistencia.user = currentUser.username;

        // Registrar la asistencia en el servicio de almacenamiento
        await this.storageService.registrarAsistencia(currentUser.username, asistencia);

        // Mostrar mensaje de éxito
        const toast = await this.toastController.create({
          message: 'Asistencia registrada exitosamente',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        toast.present();
      } else {
        // Si no se encuentra un usuario autenticado, mostramos un error
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se encontró un usuario autenticado.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } catch (error) {
      // En caso de error al registrar la asistencia
      console.error('Error al registrar la asistencia:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al registrar la asistencia.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Copiar el resultado del QR al portapapeles
  async writeToClipboard() {
    await navigator.clipboard.writeText(this.scanResult);

    const toast = await this.toastController.create({
      message: 'Copiado al portapapeles',
      duration: 2000,
      color: 'tertiary',
      icon: 'clipboard-outline',
      position: 'middle'
    });
    toast.present();
  }

  // Verificar si el resultado escaneado es una URL
  isUrl(): boolean {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/i;
    return regex.test(this.scanResult);
  }

  // Abrir la URL escaneada en el navegador
  async openCapacitorSite() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Quieres abrir este enlace en el navegador?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Abrir',
          handler: async () => {
            let url = this.scanResult;

            // Agregar 'https://' si no está presente
            if (!/^https?:\/\//i.test(url)) {
              url = 'https://' + url;
            }

            // Validar si es una URL válida
            if (this.isUrl()) {
              window.open(url, '_blank');
            } else {
              const toast = await this.toastController.create({
                message: 'URL no válida',
                duration: 2000,
                color: 'danger',
                position: 'bottom',
              });
              toast.present();
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
