/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from "../helpers/colors.ts";

class DragonBalls {
  //* Atributo estático que almacena la instancia de la clase
  private static instance: DragonBalls;
  private ballsCollected: number;

  //* Constructor privado para evitar la creación de instancias
  private constructor() {
    this.ballsCollected = 0;
  }

  //* Método para obtener la instancia de la clase que es un Singleton, si no existe la crea
  //* y si ya existe la retorna
  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls();
      console.log("%c Las esferas del dragón han sido creadas", COLORS.green);
    }
    return DragonBalls.instance;
  }

  //* Metodo para recolectar las esferas del dragón
  collectBall() {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(
        `%c Se ha recolectado la esfera número ${this.ballsCollected}`,
        COLORS.blue
      );
      return;
    }

    console.log(
      "\n%c Ya se han recolectado las 7 esferas del dragón! Invoca a Shenlong",
      COLORS.pink
    );
  }

  //* Metodo para invocar a Shenlong si se han recolectado las 7 esferas 
  summonShenlong() {
    if (this.ballsCollected === 7) {
      console.log(
        "\n%c Shenlong ha sido invocado, Pide tu deseo!",
        COLORS.green
      );
      this.ballsCollected = 0;
      return;
    }

    console.log(
      "\n%c No se pueden invocar a Shenlong, faltan esferas por recolectar",
      COLORS.red
    );
  }
}

function main() {
  console.log();

  const gokuDragonBalls = DragonBalls.getInstance();
  const vegetaDragonBalls = DragonBalls.getInstance();
  console.log(
    JSON.stringify(
      {
        gokuDragonBalls,
        vegetaDragonBalls,
        isUniqueInstance: gokuDragonBalls === vegetaDragonBalls,
      },
      null,
      2
    )
  );

  console.log();
  gokuDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  gokuDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  gokuDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  gokuDragonBalls.collectBall();

  gokuDragonBalls.summonShenlong();

  console.log();
}

main();
