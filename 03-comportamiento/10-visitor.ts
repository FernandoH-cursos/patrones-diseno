/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

//* Interfaz Visitor para las atracciones del parque temático
interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHauntedHouse(hauntedHouse: HauntedHouse): void;
  visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

//* Interfaz Attraction para las atracciones del parque temático
interface Attraction {
  accept(visitor: Visitor): void;
  getPrice(): number;
}

//* Clase concreta - Montaña rusa
class RollerCoaster implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}

//* Clase concreta - Casa del terror
class HauntedHouse implements Attraction {
  private price: number = 40;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }
}

//* Clase concreta - Rueda de la fortuna
class FerrisWheel implements Attraction {
  private price: number = 30;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitFerrisWheel(this);
  }
}

//* Clase concreta - Visitante niño
class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Precio de la montaña rusa para niño: $${rollerCoaster.getPrice() * 0.5}`
    );
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Precio de la casa del terror para niño: $${hauntedHouse.getPrice() * 0.7}`
    );
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Precio de la rueda de la fortuna para niño: $${
        ferrisWheel.getPrice() * 0.6
      }`
    );
  }
}

//* Clase concreta - Visitante adulto
class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Precio de la montaña rusa para adulto: $${rollerCoaster.getPrice()}`
    );
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(`Precio de la casa del terror para adulto: $${hauntedHouse.getPrice()}`);
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Precio de la rueda de la fortuna para adulto: $${ferrisWheel.getPrice()}`
    );
  }
}

//* Clase concreta - Visitante adulto mayor
class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Precio de la montaña rusa para adulto mayor: $${rollerCoaster.getPrice() * 0.85}`
    );
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Precio de la casa del terror para adulto mayor: $${hauntedHouse.getPrice() * 0.85}`
    );
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Precio de la rueda de la fortuna para adulto mayor: $${ferrisWheel.getPrice() * 0.85}`
    );
  }
}

//* Cliente
function main(){
  console.log();

  // Crear atracciones
  const attractions: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel(),
  ];
 

  // Crear visitantes
  const childVisitor = new ChildVisitor();
  const adultVisitor = new AdultVisitor();
  const seniorVisitor = new SeniorVisitor();

  // Calcular precios para cada visitante
  console.log("\n%cPrecios para niños:",COLORS.green);
  attractions.forEach((attraction) => attraction.accept(childVisitor));

  console.log("\n%cPrecios para adultos:",COLORS.green);
  attractions.forEach((attraction) => attraction.accept(adultVisitor));

  console.log("\n%cPrecios para adultos mayores:",COLORS.green);
  attractions.forEach((attraction) => attraction.accept(seniorVisitor));

  console.log();
}

main();
