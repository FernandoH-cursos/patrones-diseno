/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es  útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

import { COLORS } from "../helpers/colors.ts";

//* Interfaz base para los manejadores
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}

//* Clase base para los manejadores que implementa la interfaz Handler
abstract class BaseHandler implements Handler {
  // Propiedad para almacenar el siguiente manejador
  private nextHandler?: Handler;

  // Método para establecer el siguiente manejador
  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  // Método para manejar la solicitud y pasarla al siguiente manejador
  handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

//* Clase concreta para manejar las solicitudes de Soporte básico
class BasicSupport extends BaseHandler {
  // Método para manejar la solicitud de soporte básico
  override handle(request: string): void {
    if (request === "basico") {
      console.log(
        "\nSoporte básico: %cResolviendo problema básico",
        COLORS.green
      );
      return;
    }

    console.log(
      "\nSoporte básico: %cPasando el problema a soporte avanzado",
      COLORS.yellow
    );
    super.handle(request);
  }
}

//* Clase concreta para manejar las solicitudes de Soporte avanzado
class AdvancedSupport extends BaseHandler {
  // Método para manejar la solicitud de soporte avanzado
  override handle(request: string): void {
    if (request === "avanzado") {
      console.log(
        "\nSoporte avanzado: %cResolviendo problema avanzado",
        COLORS.green
      );
      return;
    }

    console.log(
      "\nSoporte avanzado: %cPasando el problema a soporte experto",
      COLORS.yellow
    );
    super.handle(request);
  }
}

//* Clase concreta para manejar las solicitudes de Soporte experto
class ExpertSupport extends BaseHandler {
  // Método para manejar la solicitud de soporte experto
  override handle(request: string): void {
    if (request === "experto") {
      console.log(
        "\nSoporte experto: %cResolviendo problema experto",
        COLORS.green
      );
      return;
    }

    console.log(
      "\nSoporte experto: %cNo se puede resolver el problema. No hay nada que hacer...",
      COLORS.red
    );
  }
}

function main() {
  console.log();

  // Crear instancias de los manejadores
  const basicSupport = new BasicSupport();
  const advancedSupport = new AdvancedSupport();
  const expertSupport = new ExpertSupport();

  // Establecer la cadena de manejadores
  basicSupport.setNext(advancedSupport).setNext(expertSupport);

  // Solicitudes
  // basicSupport.handle("basico");
  // basicSupport.handle("avanzado");
  // basicSupport.handle("experto");
  basicSupport.handle("otro");

  console.log();
}

main();
