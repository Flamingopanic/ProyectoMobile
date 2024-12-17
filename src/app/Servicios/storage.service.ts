import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface Usuario {
  username: string;
  email: string;
  password: string;
  role: string;
  asistencias: { classId: string; date: string; course: string }[];
}

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
    await this.storage.create(); // Se crea el almacenamiento correctamente
    console.log("Conexión Exitosa");
    this.bdd = this.storage; // Asigna la instancia de storage al objeto `bdd`
  }

  // Verifica si el almacenamiento está listo
  private async BDDCheck(): Promise<void> {
    await this.BDDStatus; // Asegura que el almacenamiento esté inicializado
    console.log("BDD Check Passed");
  }

  // Obtener un valor desde el almacenamiento
  async get(key: string): Promise<any> {
    await this.BDDCheck(); // Asegura que el almacenamiento esté listo
    return this.bdd.get(key);
  }

  // Guardar un valor en el almacenamiento (sin validación adicional)
  async set(key: string, valor: any): Promise<void> {
    await this.BDDCheck(); // Asegura que el almacenamiento esté listo

    console.log('Guardando usuario:', valor); // Imprimimos el valor que estamos guardando
    await this.bdd.set(key, valor); // Almacena el objeto completo
    console.log("Guardado exitoso");
  }

  // Eliminar un valor del almacenamiento
  async eliminar(key: string): Promise<void> {
    await this.BDDCheck(); // Asegura que el almacenamiento esté listo
    await this.bdd.remove(key);
  }

  // Limpiar todo el almacenamiento
  async limpiar(): Promise<void> {
    await this.BDDCheck(); // Asegura que el almacenamiento esté listo
    await this.bdd.clear();
  }

  // Obtener todos los usuarios almacenados
  async getAllUsers(): Promise<Usuario[]> {
    await this.BDDCheck(); // Asegura que el almacenamiento esté listo
    const usuarios: Usuario[] = [];

    // Asegúrate de obtener correctamente los usuarios desde el almacenamiento
    const usuariosAlmacenados = await this.bdd.get('usuarios'); // Obtener la clave 'usuarios'

    // Verifica que la clave 'usuarios' esté almacenada y no esté vacía
    if (usuariosAlmacenados && Array.isArray(usuariosAlmacenados)) {
      usuarios.push(...usuariosAlmacenados); // Añadir los usuarios a la lista
    }

    return usuarios;
  }

  // Ver usuarios en consola
  async verUsuariosEnConsola(): Promise<void> {
    await this.BDDCheck();
    const usuarios: Usuario[] = [];
    const keys = await this.bdd.keys(); // Obtener todas las claves del almacenamiento
    for (let key of keys) {
      const user = await this.bdd.get(key); // Obtener cada objeto de usuario
      if (user) usuarios.push(user); // Almacenar cada usuario en el array
    }
    console.log('Usuarios registrados:', usuarios);
  }

  async limpiarTodo() {
    try {
      await this.bdd.clear(); // Limpia todo el almacenamiento
      console.log("Almacenamiento limpio exitosamente");
    } catch (error) {
      console.error("Error al limpiar el almacenamiento:", error);
    }
  }

  
  async registrarAsistencia(username: string, asistencia: { classId: string; date: string; course: string; user: string }): Promise<void> {
    const usuarios: Usuario[] = await this.get('usuarios') || [];
    const usuarioIndex = usuarios.findIndex((u: Usuario) => u.username === username);

    if (usuarioIndex !== -1) {
     // Agregar la nueva asistencia al usuario
      usuarios[usuarioIndex].asistencias.push(asistencia);
      await this.set('usuarios', usuarios); // Guardar los cambios
      console.log(`Asistencia registrada para ${username}:`, asistencia);
    } else {
      console.error('Usuario no encontrado para registrar asistencia.');
    }
  }

}
