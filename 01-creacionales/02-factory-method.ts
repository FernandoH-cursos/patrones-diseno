/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

//? Interfaz para la hamburguesa 
interface Hamburger{
  prepare(): void;
}

//? Clase concreta de hamburguesa de pollo 
class ChickenHamburger implements Hamburger{
  prepare(): void {
    console.log('Preparando hamburguesa de %cpollo',COLORS.yellow);
  }
}

//? Clase concreta de hamburguesa de res
class BeefHamburger implements Hamburger{
  prepare(): void {
    console.log('Preparando hamburguesa de %cres',COLORS.brown);
  }
}

//? Clase concreta de hamburguesa de frijol
class BeanHamburger implements Hamburger{
  prepare(): void {
    console.log('Preparando hamburguesa de %cfrijol',COLORS.orange);
  }
}

//? Clase abstracta de restaurante para crear hamburguesas
abstract class Restaurant { 
  abstract createHamburger(): Hamburger;

  //* Metodo para ordenar hamburguesa pero no sabemos que tipo de hamburguesa es
  orderHamburger(): void {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

//? Clase concretas de restaurante para crear hamburguesas de poll
class ChickenRestaurant extends Restaurant{
  override createHamburger(): Hamburger {
    return new ChickenHamburger();
  }
}

//? Clase concretas de restaurante para crear hamburguesas de res
class BeefRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new BeefHamburger();
  }
}

//? Clase concretas de restaurante para crear hamburguesas de frijol
class BeanRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new BeanHamburger();
  }
}


function main() {
  console.log();

  let restaurant: Restaurant;

  const burguerType = prompt('¿Qué hamburguesa desea? (chicken/res/bean)');
  switch (burguerType) {
    case 'chicken':
      restaurant = new ChickenRestaurant();
      break;
    case 'res':
      restaurant = new BeefRestaurant();
      break;
    case 'bean':
      restaurant = new BeanRestaurant();
      break;
    default:
      throw new Error('Tipo de hamburguesa no válido'); 
  }

  restaurant.orderHamburger();
}

main();
