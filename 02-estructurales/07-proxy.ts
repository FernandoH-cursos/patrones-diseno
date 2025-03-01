/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";

//* Clase jugador para el ejemplo
class Player {
  namer: string;
  level: number;

  constructor(name: string, level: number) {
    this.namer = name;
    this.level = level;
  }
}

interface Room {
  enter(player: Player): void;
}

//* Clase que implementa la interfaz Room y representa una sala común
class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(
      `%c${player.namer} ha ingresado a la sala secreta`,
      COLORS.black
    );
    console.log("Un gran enemigo te espera");
  }
}

//* Clase Proxy que controla el acceso a la sala secreta
class MagicPortal implements Room {
  private secretRoom: SecretRoom;

  constructor(room: SecretRoom) {
    this.secretRoom = room;
  }

  enter(player: Player): void {
    if (player.level >= 10) {
      this.secretRoom.enter(player);
      return;
    }

    console.log(
      `%c${player.namer} no tiene el nivel suficiente. Tu nivel ${player.level}, es muy bajo, necesitas nivel 10`,
      COLORS.red
    );
  }
}

function main(){
  console.log();

  const player1 = new Player("Gandalf", 5);
  const player2 = new Player("Frodo", 10);
  
  const secretRoom = new SecretRoom();
  const magicPortal = new MagicPortal(secretRoom);

  magicPortal.enter(player1);
  magicPortal.enter(player2);

  console.log();
}

main();
