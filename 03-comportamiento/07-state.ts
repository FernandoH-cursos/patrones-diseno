/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors.ts";
import { sleep } from "../helpers/sleep.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

//* Interfaz State para la máquina expendedora sepa qué métodos implementar
interface State {
  name: string;

  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

//* Clase Context - VendingMachine para manejar el estado actual
class VendingMachine {
  private state: State;

  constructor() {
    // Estado inicial de la máquina
    this.state = new WaitingForMoney(this);
  }

  insertMoney(): void {
    this.state.insertMoney();
  }

  selectProduct(): void {
    this.state.selectProduct();
  }

  dispenseProduct(): void {
    this.state.dispenseProduct();
  }

  getStateName(): string {
    return this.state.name;
  }

  setState(newState: State): void {
    this.state = newState;
    console.log(`Estado cambiado a: %c${newState.name}`, COLORS.yellow);
  }
}

//* Estado 1 - Esperando Dinero
class WaitingForMoney implements State {
  public name: string = "Esperando Dinero";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log(
      "Dinero insertado: %cAhora puedes seleccionar un producto.",
      COLORS.green
    );

    // Cambiar al estado de Seleccionando Producto
    this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
  }

  selectProduct(): void {
    console.log("%cPrimero debes insertar dinero.", COLORS.red);
  }

  dispenseProduct(): void {
    console.log("%cPrimero debes insertar dinero.", COLORS.red);
  }
}

//* Estado 2 - Seleccionando Producto
class ProductSelected implements State {
  public name: string = "Seleccionando Producto";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log(
      "%cPor favor selecciona un producto. Ya has insertado dinero.",
      COLORS.red
    );
  }

  selectProduct(): void {
    console.log("Producto seleccionado: %cEntregando producto.", COLORS.green);

    // Cambiar al estado de Entregando Producto
    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
  }

  dispenseProduct(): void {
    console.log("%cPrimero debes seleccionar un producto.", COLORS.red);
  }
}

//* Estado 3 - Entregando Producto
class DispensingProduct implements State {
  public name: string = "Entregando Producto";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log("%cPor favor espera a que se entregue el producto", COLORS.red);
  }

  selectProduct(): void {
    console.log("%cYa has seleccionado un producto.", COLORS.red);
  }

  dispenseProduct(): void {
    console.log("%cProducto entregado: Gracias por tu compra.", COLORS.green);

    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
  }
}

// Uso del patrón State
function main() {
  console.log();

  // Crear una nueva máquina expendedora
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = "4";

  do {
    console.log(
      `Estado actual: %c${vendingMachine.getStateName()}`,
      COLORS.blue
    );
    selectedOption = prompt(`
      1. Insertar dinero
      2. Seleccionar producto
      3. Entregar producto
      4. Salir

      Selecciona una opción: 
    `);

    switch (selectedOption) {
      case "1":
        // Insertar dinero
        vendingMachine.insertMoney();
        break;
      case "2":
        // Seleccionar producto
        vendingMachine.selectProduct();
        break;
      case "3":
        // Entregar producto
        vendingMachine.dispenseProduct();
        break;
      case "4":
        console.log("Saliendo...");
        break;
      default:
        console.log("Opción no válida.");
        break;
    }
    sleep(3000);
  } while (selectedOption !== "4");

  console.log();
}

main();
