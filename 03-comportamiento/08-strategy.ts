/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

//* Interfaz que define el comportamiento de movimiento de los patitos 
interface MovementStrategy { 
  move(): void;
}

//* Estrategia 1 - Nadar rápido pero más costoso de implementar
class SwimFast implements MovementStrategy {
  move(): void {
    console.log("%cEl pato nada rápidamente sobre el agua", COLORS.blue);
  }
}

//* Estrategia 2 - Volar sobre el agua pero no tan costoso de implementar
class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log("%cEl pato vuela elegantemente sobre el agua", COLORS.pink);
  }
}

//* Estrategia 3 - Caminar torpemente pero más lento y económico
class WalkClumsily implements MovementStrategy {
  move(): void {
    console.log("%cEl pato camina torpemente por la orilla", COLORS.green);
  }
}

//* Clase consumidora de las estrategias para moverse
class Duck {
  private name: string;
  private movementStrategy: MovementStrategy;

  constructor(name: string, strategy: MovementStrategy) {
    this.name = name;
    this.movementStrategy = strategy;

    console.log(`%c${this.name} %clisto para competir`, COLORS.green,COLORS.white);
  }

  performMove(): void {
    console.log(`${this.name} se prepara para moverse...`);
    this.movementStrategy.move();
  }

  setMovementStrategy(strategy: MovementStrategy): void {
    this.movementStrategy = strategy;
    console.log(`%c${this.name} %cha cambiado de estrategia`, COLORS.green, COLORS.white);
  }
}

//* Crear los patitos con sus respectivas estrategias
function main() {
  console.log();

  const duck1 = new Duck("Pato rápido", new SwimFast());
  const duck2 = new Duck("Pato volador", new FlyOverWater());
  const duck3 = new Duck("Pato torpe", new WalkClumsily());

  console.log('\n%cComienza la carrera de patos!', COLORS.red);
  duck1.performMove();
  duck2.performMove();
  duck3.performMove();

  duck3.setMovementStrategy(new FlyOverWater());
  duck3.performMove();


  console.log();
}

main();

