/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";


//* En el patron bridge esta interfaz es la que se encarga de definir la abstracción
//* de las clases concretas 
interface Ability{
  use(): void;
}

//* En este caso las clases concretas son las que se encargan de implementar la interfaz
//* y de definir la lógica de la habilidad
class SwordAttack implements Ability{
  use(): void {
    console.log('Ataca con una %cespada ferozmente', COLORS.blue);
  }
}

class AxeAttack implements Ability{
  use(): void {
    console.log('Ataca con un %chacha brutalmente', COLORS.red);
  }
}

class MagicSpell implements Ability{
  use(): void {
    console.log('Lanza un %chechizo mágico poderoso', COLORS.green);
  }
}

class FireballSpell implements Ability{
  use(): void {
    console.log('Lanza una %cbola de fuego', COLORS.orange);
  }
}



//* En este caso la clase abstracta es la que se encarga de definir la abstracción
//* y de tener una referencia a la interfaz 
abstract class Character { 
  protected ability: Ability;

  constructor(ability: Ability){
    this.ability = ability;
  }

  setAbility(ability: Ability): void {
    this.ability = ability;
  }

  abstract performAbility(): void;
}

//* Las clases concretas son las que se encargan de implementar la abstracción
//* y de definir la lógica de la abstracción
class Warrior extends Character{
  override performAbility(): void {
    console.log('\nEl guerrero está listo para luchar');
    this.ability.use();
  }
}

class Mage extends Character{
  override performAbility(): void {
    console.log("\nEl mago prepara su magia");
    this.ability.use();
  }
}

//* Codigo cliente
function main(){
  const warrior = new Warrior(new SwordAttack());
  warrior.performAbility();
  warrior.setAbility(new AxeAttack());
  warrior.performAbility();

  const mage = new Mage(new MagicSpell());
  mage.performAbility();
  mage.setAbility(new FireballSpell());
  mage.performAbility();

  console.log();
}

main();


