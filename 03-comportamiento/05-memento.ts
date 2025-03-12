/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

import { COLORS } from "../helpers/colors.ts";

//* Clase Memento - GameMemento para guardar el estado del juego
class GameMemento {
  private level: number;
  private health: number;
  private position: string;

  constructor(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;
  }

  getLevel(): number {
    return this.level;
  }

  getHealth(): number {
    return this.health;
  }

  getPosition(): string {
    return this.position;
  }
}

//* Clase Originator - Game para manejar el estado del juego
class Game {
  private level: number = 1;
  private health: number = 100;
  private position: string = "Inicio";

  constructor() {
    console.log(`
    Jugando en el nivel ${this.level}
      Salud: ${this.health}
      Posición: ${this.position}
    `);
  }

  // Método para guardar el estado actual del juego
  save(): GameMemento {
    return new GameMemento(this.level, this.health, this.position);
  }

  // Método para jugar y mostrar el estado actual del juego
  play(level: number, health: number, position: string): void {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(`
    Jugando en el nivel ${this.level}
      Salud: ${this.health}
      Posición: ${this.position}
    `);
  }

  // Método para restaurar el estado del juego desde un memento dado
  restore(memento: GameMemento): void {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    console.log(
      `
    %cProgreso restaurado:
      
    %cJugando en el nivel %c${this.level}
      Salud: ${this.health}
      Posición: ${this.position}
    `,
      COLORS.yellow,
      COLORS.blue,
      COLORS.white
    );
  }
}

//* Clase Caretaker - GameHistory para guardar los mementos del juego
class GameHistory {
  private mementos: GameMemento[] = [];

  push(memento: GameMemento): void {
    this.mementos.push(memento);
  }

  pop(): GameMemento | null {
    return this.mementos.pop() ?? null;
  }
}

//* Ejemplo de uso del patrón Memento
function main() {
  console.log();

  // Iniciar un nuevo juego y guardarlo en la historia
  const game = new Game();
  const history = new GameHistory();

  // Jugar y guardar el estado del juego en cada paso
  history.push(game.save());

  // Jugar en diferentes niveles y guardar el estado del juego en cada paso
  game.play(2, 90, "Bosque encantado");
  history.push(game.save());

  game.play(3, 70, "Cueva oscura");
  history.push(game.save());

  game.play(4, 50, "Castillo del Dragón");
  console.log(`%cEstado actual del juego:`, COLORS.green);

  // Mostrar el estado actual del juego y restaurar el último estado guardado
  game.restore(history.pop()!);
  console.log(`%cDespués de restaurar el último estado guarado`, COLORS.green);
  
  game.restore(history.pop()!);
  console.log(`%cDespués de restaurar el último estado guarado`, COLORS.green);
  

  console.log();
}

main();
