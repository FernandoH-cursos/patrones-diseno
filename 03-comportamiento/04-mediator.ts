/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

import { COLORS } from "../helpers/colors.ts";

//* Clase ChatRoom que actúa como mediador entre los usuarios.
//* Los usuarios no se comunican directamente entre sí, sino a través de la sala de chat
//* que gestiona la información.
//* Los usuarios pueden enviar mensajes a la sala de chat y la sala de chat los distribuirá a los demás usuarios.
//* La sala de chat también puede enviar mensajes a usuarios específicos.
//* Los usuarios pueden unirse o salir de la sala de chat.
//* La sala de chat notificará a los demás usuarios cuando un usuario se una o salga de la sala.
//* La sala de chat también puede enviar mensajes a todos los usuarios.
//* La sala de chat también puede enviar mensajes a un usuario específico.
//* La sala de chat también puede enviar mensajes a un grupo de usuarios.
//* La sala de chat también puede enviar mensajes a todos los usuarios excepto a uno.
//* La sala de chat también puede enviar mensajes a todos los usuarios excepto a un grupo de usuarios.
//* La sala de chat también puede enviar mensajes a todos los usuarios excepto a un usuario específico.
//* La sala de chat también puede enviar mensajes a todos los usuarios excepto a un grupo de usuarios específico.
class ChatRoom {
  private users: User[] = [];
  public title: string;

  constructor(title: string) {
    this.title = title;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string): void {
    const usersToSend = this.users.filter((user) => user !== sender);

    for (const user of usersToSend) {
      user.receiveMessage(sender, message);
    }
  }
}

//* Clase User que representa a un usuario que puede enviar y recibir mensajes a través de la sala de chat.
class User {
  private username: string;
  private chatRoom: ChatRoom;

  constructor(username: string, chatRoom: ChatRoom) {
    this.username = username;
    this.chatRoom = chatRoom;

    //* Agregar el usuario a la sala de chat 
    this.chatRoom.addUser(this);
  }

  sendMessage(message: string): void {
    console.log(
      `\n%c${this.username}: %c${message}`,
      COLORS.green,
      COLORS.white
    );

    this.chatRoom.sendMessage(this, message);
  }

  receiveMessage(sender: User, message: string): void {
    console.log(
      `\n%c${this.username} recibe de ${sender.username}: %c${message}`,
      COLORS.blue,
      COLORS.white
    );
  }
}

function main() {
  console.log();

  //* Crear una sala de chat 
  const chatRoom = new ChatRoom("Grupo de tra|");
  
  //* Crear usuarios
  const user1 = new User("Fernando", chatRoom);
  const user2 = new User("Gaston", chatRoom);
  const user3 = new User("Mariangel", chatRoom);

  //* Enviar mensajes a través de la sala de chat 
  user1.sendMessage("Hola a todos");
  user2.sendMessage("Hola Fernando, ¿cómo estás?");
  user3.sendMessage("Hola, Gaston, ¿cómo estás?");

  console.log();
}

main();
