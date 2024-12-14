import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Clipboard } from '@capacitor/clipboard';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-leerqr',
  templateUrl: './leerqr.page.html',
  styleUrls: ['./leerqr.page.scss'],
})
export class LeerqrPage implements OnInit {

  scanResult = '';
  
  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController

  ) { }

  async startScan(){
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

    if(data){
      this.scanResult = data?.barcode?.displayValue;
    }
  }

  ngOnInit(): void {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners().then();
    }
  }
  
  writeToClipboard = async () => {
    await Clipboard.write({
      string: this.scanResult
    });

    const toast = await this.toastController.create({
      message: 'Copiado',
      duration: 2000,
      color: 'tertiary',
      icon:  'clipboard-outline',
      position: 'middle'
    });
    toast.present();
  };

  isUrl(){
    let regex = /\.(com|net|io|me|crypto|ai)\b/i;
    return regex.test(this.scanResult);
  }
  

openCapacitorSite = async () => {

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Quieres abrir este enlace en el navegador?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Okay',
          handler: async() => {
            let url = this.scanResult;

            if(!['https://'].includes(this.scanResult)) url ='https://'+ this.scanResult

            await Browser.open({ url });
          }
        }
      ]
    });
  
    await alert.present();
  

  
};
}
