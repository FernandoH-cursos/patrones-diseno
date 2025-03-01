/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";

//? Interfaz NotificationChannel
interface NotificationChannel {
  send(message: string): void;
}

//? Implementaciones de Canales de Comunicación
class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

//? Clase Abstracta Notification
abstract class Notification {

  protected channels: NotificationChannel[];

  constructor(channels: NotificationChannel[]) {
    this.channels = channels;
  }

  abstract notify(message: string): void;
  abstract addChanel(channel: NotificationChannel): void;
}


//? Clase concreta AlertNotification para enviar varias notificaciones con diferentes canales
class AlertNotification extends Notification {
  override notify(message: string): void {
    this.channels.forEach((channel) => channel.send(message));
  }

  override addChanel(channel: NotificationChannel): void {
    this.channels.push(channel);
  }
}

//? Cliente de las notificaciones 
function main() {
  console.log();

  const channels: NotificationChannel[] = [
    new EmailChannel(),
    new SMSChannel(),
    new PushNotificationChannel(),
    new PushNotificationChannel(),
    new PushNotificationChannel(),
  ];

  const alertNotification = new AlertNotification(channels);
  alertNotification.notify('Alguien en frente de la casa');

  console.log();
}

main();