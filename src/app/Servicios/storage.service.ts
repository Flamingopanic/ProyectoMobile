import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
private bdd:Storage = new Storage();
private BDDStatus:Promise<void>;

  constructor(private storage:Storage) {
    this.BDDStatus = this.onInit();
   }

  async onInit():Promise<void>{
    const storage = await this.storage.create();
    this.bdd=storage;
  }

//CHECK
async BDDCheck():Promise<void>{
  await this.BDDStatus;
}
//GET
async get(key:string):Promise<any>{ 
  await this.BDDCheck();
  return this.bdd.get(key);
}
//SET 
async set(key:string,valor:any){
  await this.BDDCheck();
  this.bdd.set(key,valor);
  console.log("guardado exitoso")
}
//REMOVE
async eliminar(key: string) {
  await this.BDDCheck()
  this.bdd.remove(key);
}
//CLEAR
async limpiar() {
  await this.BDDCheck()
  this.bdd.clear();
}

}
