import { COLORS } from '../helpers/colors.ts';
/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class Pokemon {
  /* name: string;
  type: string;
  level: number;
  attacks: string[]; */

  constructor(public name: string, public type: string, public level: number, public attacks: string[]) {
   /*  this.name = name;
    this.type = type;
    this.level = level;
    this.attacks = attacks; */
  }

  // Método para clonar el Pokémon
  clone(): Pokemon {
    // Los ataques deben de evitar pasarse por referencia, es decir, no deben de ser el mismo arreglo.
    // Completar: Debe devolver un nuevo Pokémon con los mismos atributos

    //* En los ataques usamos el [...this.attacks] para que no se pase por referencia, es decir, no deben de ser 
    //* el mismo arreglo y se cree uno nuevo para que no se modifique el original.
    return new Pokemon(this.name, this.type, this.level, [...this.attacks]);
  }

  displayInfo(): void {
    console.log(
      `\nNombre: ${this.name}\nTipo: ${this.type}\nNivel: ${
        this.level
      }\nAtaques: ${this.attacks.join(", ")}`
    );
  }
}

// Tarea:
// 1. Crear un Pokémon base.
// 2. Clonar el Pokémon base y modificar algunos atributos en los clones.
// 3. Llamar a displayInfo en cada Pokémon para mostrar sus detalles.

// Ejemplo:
// const basePokemon = new Pokemon("Charmander", "Fuego", 1, ["Llamarada", "Arañazo"]);
// const clone1 = basePokemon.clone();
// clone1.name = "Charmeleon";
// clone1.level = 16;
// clone1.attacks.push("Lanzallamas");

// basePokemon.displayInfo(); // Aquí no debe de aparecer "Lanzallamas"
// clone1.displayInfo();

function main() {
  console.log();

  const basePokemon = new Pokemon("Charmander", "Fuego", 1, [
    "Llamarada",
    "Arañazo",
  ]);
  const clone1 = basePokemon.clone();
  clone1.name = "Charmeleon";
  clone1.level = 16;
  clone1.attacks.push("Lanzallamas");

  console.log("%cPokémon base:",COLORS.red);
  basePokemon.displayInfo(); // Aquí no debe de aparecer "Lanzallamas"

  console.log("\n%cPokémon clonado:",COLORS.pink);
  clone1.displayInfo();

  console.log();
}

main();
