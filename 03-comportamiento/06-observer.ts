/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */
import { COLORS } from "../helpers/colors.ts";

//* Interfaz del sujeto para notificar a los observadores
interface Observer {
  notify(videoTitle: string): void;
}

//* Clase Observable que notifica a los observadores
class YoutubeChannel {
  // Lista de observadores que se suscriben al canal
  private suscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Método que notifica cuuando se suscribe una persona al canal
  subscribe(observer: Observer): void {
    this.suscribers.push(observer);
    console.log(`Nuevo suscriptor al canal %c${this.name}`, COLORS.green);
  }

  // Método que notifica cuando se elimina un suscriptor del canal
  unsubscribe(observer: Observer): void {
    this.suscribers = this.suscribers.filter(
      (suscriber) => suscriber !== observer
    );
    console.log(
      `Un suscriptor se ha dado de baja en %c"${this.name}"`,
      COLORS.red
    );
  }

  // Método que notifica a los observadores cuando se sube un video
  uploadVideo(videoTitle: string): void {
    console.log(
      `Canal ${this.name} ha subido un nuevo video %c${videoTitle}`,
      COLORS.green
    );

    // Notificar a los observadores
    this.suscribers.forEach((suscriber) => {
      suscriber.notify(videoTitle);
    });
  }
}

//* Clase suscriptor que se suscribe al canal de youtube para recibir notificaciones
class Suscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(
      `El suscriptor ${this.name} ha sido notificado: %cNuevo video ${videoTitle}`,
      COLORS.blue
    );
  }
}

function main(){
  console.log();

  // Crear un canal de youtube
  const youtubeChannel = new YoutubeChannel("Cocinando con Fernando");

  // Crear suscriptores
  const juan = new Suscriber("Juan");
  const maria = new Suscriber("Maria");
  const pedro = new Suscriber("Pedro");
  
  // Suscribir a los observadores
  youtubeChannel.subscribe(juan);
  youtubeChannel.subscribe(maria);
  youtubeChannel.subscribe(pedro);
  console.log();

  // Subir un video
  youtubeChannel.uploadVideo("Receta de pizza");
  console.log();

  // Eliminar un suscriptor
  youtubeChannel.unsubscribe(pedro);
  console.log();

  // Subir un video
  youtubeChannel.uploadVideo("Receta de pasta");
  

  console.log();
}

main();
