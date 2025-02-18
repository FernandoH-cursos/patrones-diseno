/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

import { COLORS } from "../helpers/colors.ts";

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

//? Interfaz para hamburguesas 
interface Hamburger {
  prepare(): void;
}

//? Interfaz para bebidas
interface Drink {
  pour(): void;
}

//? Clase de hamburguesa de pollo
class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando hamburguesa de %cpollo", COLORS.yellow);
  }
}

//? Clase de hamburguesa de res
class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando hamburguesa de %cres", COLORS.red);
  }
}

//? Clase de bebida de agua
class Water implements Drink {
  pour(): void {
    console.log("Sirviendo un vaso de %cagua", COLORS.blue);
  }
}

//? Clase de bebida gaseosa
class Soda implements Drink {
  pour(): void {
    console.log("Sirviendo un vaso de %cgaseosa", COLORS.pink);
  }
}

//? Interfaz de la fábrica de restaurantes para crear hamburguesas y bebidas
interface RestaurantFactory {
  createHamburger(): Hamburger;
  createDrink(): Drink;
}

//? Fábrica de restaurantes de comida rápida que crea hamburguesas de res y gaseosas
class FastFoodRestaurantFactory implements RestaurantFactory {
  createHamburger(): Hamburger {
    return new BeefHamburger();
  }

  createDrink(): Drink {
    return new Soda();
  }
}

//? Fábrica de restaurantes de comida saludable que crea hamburguesas de pollo y agua
class HealthyFoodRestaurantFactory implements RestaurantFactory {
  createHamburger(): Hamburger {
    return new ChickenHamburger();
  }

  createDrink(): Drink {
    return new Water();
  }
}

//? Cliente que consume la fábrica de restaurantes
function main(factory: RestaurantFactory) {
  console.log();

  //* Creamos una hamburguesa y una bebida sin especificar sus clases concretas, es decir, sin saber si es de 
  //* pollo o res, o si es agua o gaseosa. 
  const hamburger = factory.createHamburger();
  const drink = factory.createDrink();

  hamburger.prepare();
  drink.pour();
}

const fastFoodFactory = new FastFoodRestaurantFactory();
const healthyFoodFactory = new HealthyFoodRestaurantFactory();

console.log('\n%cPedido del menú regular:',COLORS.green);
main(fastFoodFactory);

console.log("\n%cPedido del menú saludable:", COLORS.green);
main(healthyFoodFactory);
