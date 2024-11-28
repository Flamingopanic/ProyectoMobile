import { Injectable } from '@angular/core'; 
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private bdd!: Storage;
  private BDDStatus: Promise<void>;

  constructor(private storage: Storage) {
    // Inicialización del Storage al crear la instancia del servicio
    this.BDDStatus = this.onInit();
  }

  // Inicializa el almacenamiento cuando el servicio se crea
  private async onInit(): Promise<void> {
    await this.storage.create();  // Se crea el almacenamiento correctamente
    console.log("Conexión Exitosa");
    this.bdd = this.storage;  // Asigna la instancia de storage al objeto `bdd`
  }

  // Verifica si el almacenamiento está listo
  private async BDDCheck(): Promise<void> {
    await this.BDDStatus;  // Asegura que el almacenamiento esté inicializado
    console.log("BDD Check Passed");
  }

  // Obtener un valor desde el almacenamiento
  async get(key: string): Promise<any> {
    await this.BDDCheck();  // Asegura que el almacenamiento esté listo
    return this.bdd.get(key);
  }

  // Guardar un valor en el almacenamiento (sin validación adicional)
  async set(key: string, valor: any): Promise<void> {
    await this.BDDCheck();  // Asegura que el almacenamiento esté listo

    console.log('Guardando usuario:', valor);  // Imprimimos el valor que estamos guardando
    await this.bdd.set(key, valor);  // Almacena el objeto completo
    console.log("Guardado exitoso");
  }

  // Eliminar un valor del almacenamiento
  async eliminar(key: string): Promise<void> {
    await this.BDDCheck();  // Asegura que el almacenamiento esté listo
    await this.bdd.remove(key);
  }

  // Limpiar todo el almacenamiento
  async limpiar(): Promise<void> {
    await this.BDDCheck();  // Asegura que el almacenamiento esté listo
    await this.bdd.clear();
  }

  
  // Obtener todos los usuarios almacenados
  async getAllUsers(): Promise<any[]> {
   await this.BDDCheck();  // Asegura que el almacenamiento esté listo
    const usuarios: any[] = [];

  // Asegúrate de obtener correctamente los usuarios desde el almacenamiento
    const usuariosAlmacenados = await this.bdd.get('usuarios');  // Obtener la clave 'usuarios'
  
  // Verifica que la clave 'usuarios' esté almacenada y no esté vacía
    if (usuariosAlmacenados && Array.isArray(usuariosAlmacenados)) {
      usuarios.push(...usuariosAlmacenados);  // Añadir los usuarios a la lista
    }

    return usuarios;
  }


  // Ver usuarios en consola
  async verUsuariosEnConsola(): Promise<void> {
    await this.BDDCheck();
    const usuarios: any[] = [];
    const keys = await this.bdd.keys();  // Obtener todas las claves del almacenamiento
    for (let key of keys) {
      const user = await this.bdd.get(key);  // Obtener cada objeto de usuario
      usuarios.push(user);  // Almacenar cada usuario en el array
    }
    console.log('Usuarios registrados:', usuarios);
  }

  async limpiarTodo() {
  try {
    await this.bdd.clear();  // Limpia todo el almacenamiento
    console.log("Almacenamiento limpio exitosamente");
  } catch (error) {
    console.error("Error al limpiar el almacenamiento:", error);
  }
}
}
