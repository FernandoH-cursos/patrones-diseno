/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

import { COLORS } from "../helpers/colors.ts";

//* Interfaz Command para definir el método execute que será implementado por las clases concretas
interface Command {
  execute(): void;
}

//* Clase de Luz que es el invocador de los comandos, en este caso el control remoto
class Light {
  turnOn(): void {
    console.log("%cLa luz está encendida", COLORS.yellow);
  }
  turnOff(): void {
    console.log("%cLa luz está apagada", COLORS.yellow);
  }
}

//* Clase de Ventilador que es el invocador de los comandos, en este caso el control remoto
class Fan {
  on(): void {
    console.log("%cEl ventilador está encendido", COLORS.green);
  }
  off(): void {
    console.log("%cEl ventilador está apagado", COLORS.green);
  }
}

//* Clase de comando para encender la luz
class LightOnCommand implements Command {
  constructor(private light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOn();
  }
}

//* Clase de comando para apagar la luz
class LightOffCommand implements Command {
  constructor(private light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOff();
  }
}

//* Clase de comando para encender el ventilador
class FanOnCommand implements Command {
  constructor(private fan: Fan) {
    this.fan = fan;
  }

  execute(): void {
    this.fan.on();
  }
}

//* Clase de comando para apagar el ventilador
class FanOffCommand implements Command {
  constructor(private fan: Fan) {
    this.fan = fan;
  }

  execute(): void {
    this.fan.off();
  }
}

//* Clase de control remoto que recibe los comandos
class RemoteControl {
  private commands: Record<string, Command> = {};

  //* Método para asignar un comando a un botón
  setCommand(button: string, command: Command): void {
    this.commands[button] = command;
  }

  pressButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }

    console.log("%cEl botón no tiene asignado ningún comando", COLORS.red);
  }
}

//* Creación de los objetos de luz y ventilador
function main() {
  console.log();

  const light = new Light();
  const fan = new Fan();

  //* Creación de los comandos
  const lightOn = new LightOnCommand(light);
  const lightOff = new LightOffCommand(light);
  const fanOn = new FanOnCommand(fan);
  const fanOff = new FanOffCommand(fan);

  //* Creación del control remoto
  const remote = new RemoteControl();

  //* Asignación de los comandos a los botones
  remote.setCommand("1", lightOn);
  remote.setCommand("2", lightOff);
  remote.setCommand("3", fanOn);
  remote.setCommand("4", fanOff);

  //* Ejecución de los comandos
  let continueProgram = true;

  do {
    console.clear();

    const pressedButton =
      prompt(
        `Presiona un botón del control:
      1. Encender la luz
      2. Apagar la luz
      3. Encender el ventilador
      4. Apagar el ventilador

      Botón:
      `
      ) ?? "";

    remote.pressButton(pressedButton);

    const continueProgramResponse = prompt(
      `¿Deseas continuar? (y/n)
      `
    )?.toLocaleLowerCase();

    continueProgram = !(continueProgramResponse === "n");
  } while (continueProgram);

  console.log();
}

main();
