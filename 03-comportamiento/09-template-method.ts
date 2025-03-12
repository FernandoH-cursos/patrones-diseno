/**
 * ! Patrón Template Method
 *
 * El patrón Template Method es un patrón de diseño de comportamiento
 * que define el esqueleto de un algoritmo en una operación,
 * delegando algunos pasos a las subclases.
 *
 * Permite que las subclases redefinan ciertos pasos de un algoritmo
 * sin cambiar su estructura.
 *
 * * Es útil cuando se tiene un algoritmo que sigue una secuencia de pasos
 * * y se quiere permitir a las subclases que redefinan algunos de esos pasos.
 *
 * https://refactoring.guru/es/design-patterns/template-method
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Contexto: Vamos a implementar un sistema que permite preparar
 * diferentes bebidas calientes, como café y té.
 *
 * Aunque el proceso general para preparar ambas bebidas es similar
 * (hervir agua, añadir el ingrediente principal, servir en una taza),
 * hay pasos específicos que varían dependiendo de la bebida.
 *
 * El patrón Template Method es perfecto para este caso,
 * ya que define un esqueleto general del algoritmo en una clase base
 * y delega los detalles específicos a las subclases.
 */

//* Clase base para las bebidas calientes (Template Method) 
abstract class HotBeverage {
  // Método Template Method que define el esqueleto del algoritmo
  prepare(): void {
    this.boilWater();
    this.addMainIngredient();
    this.pourInCup();
    this.addCondiments();
  }

  // Calentamos el agua
  private boilWater(): void {
    console.log('Hirviendo agua...');
  }

  // Sirviendo en la taza
  private pourInCup(): void {
    console.log('Sirviendo en la taza...');
  }

  //* Métodos abstractos que deben ser implementados por las subclases

  // Añadir el ingrediente principal
  protected abstract addMainIngredient(): void;
  // Añadir condimentos
  protected abstract addCondiments(): void;
}

//* Clase para preparar té
class Tea extends HotBeverage {
  protected override addMainIngredient(): void {
    console.log('Añadiendo una bolsa de té');
  }

  protected override addCondiments(): void {
    console.log('Añadiendo miel y limón');
  }
}

//* Clase para preparar café
class Coffee extends HotBeverage {
  protected override addMainIngredient(): void {
    console.log('Añadiendo café molido');
  }

  protected override addCondiments(): void {
    console.log('Añadiendo leche y azúcar');
  }
}

function main(){
  console.log();

  const tea = new Tea();
  console.log('%cPreparando té...',COLORS.blue);
  tea.prepare();


  const coffee = new Coffee();
  console.log("\n%cPreparando café...",COLORS.blue);
  coffee.prepare();

  console.log();
}

main();