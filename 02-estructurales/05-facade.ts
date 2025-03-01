/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade(fachada) define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../helpers/colors.ts";

//* Subsistema 1 de la fachada
class Projector {
  turnOn() {
    console.log("Proyector encendido");
  }

  turnOff() {
    console.log("Proyector apagado");
  }
}

//* Subsistema 2 de la fachada
class SoundSystem {
  on() {
    console.log("Sistema de sonido encendido");
  }

  off() {
    console.log("Sistema de sonido apagado");
  }
}

//* Subsistema 3 de la fachada
class VideoPlayer {
  on() {
    console.log("Video Player encendido");
  }

  play(movie: string) {
    console.log(`Reproduciendo %c${movie}`, COLORS.blue);
  }

  stop() {
    console.log("Película detenida");
  }

  off() {
    console.log("Video Player apagado");
  }
}

//* Subsistema 4 de la fachada
class PopcornMaker {
  popingPopcorn() {
    console.log("Haciendo palomitas");
  }

  turnOffPopingPorcorn() {
    console.log("Apagando máquina de palomitas");
  }
}

interface HomeTheaterFacadeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

//* Fachada
class HomeTheaterFacade {
  //* Subsistemas que se van a utilizar
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  }: HomeTheaterFacadeOptions) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornMaker = popcornMaker;
  }

  //* Método para encender todos los subsistemas
  watchMovie(movie: string) {
    console.log("\n%cPreparando todo para ver la película", COLORS.blue);
    this.projector.turnOn();
    this.soundSystem.on();
    this.popcornMaker.popingPopcorn();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);
  }

  //* Método para apagar todos los subsistemas
  endWatchingMovie() {
    console.log("\n%cPreparando para detener la película", COLORS.blue);
    this.projector.turnOff();
    this.soundSystem.off();
    this.popcornMaker.turnOffPopingPorcorn();
    this.videoPlayer.stop();
    this.videoPlayer.off();

    console.log("%cSistema apagado", COLORS.blue);
  }
}

function main() {
  console.log();

  //* Crear los subsistemas que se van a utilizar en la fachada 
  const projector = new Projector();
  const soundSystem = new SoundSystem();
  const videoPlayer = new VideoPlayer();
  const popcornMaker = new PopcornMaker();

  //* Crear la fachada con los subsistemas que se van a utilizar 
  const homeTheater = new HomeTheaterFacade({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  });

  //* Utilizar la fachada para encender y apagar los subsistemas 
  homeTheater.watchMovie("The Avengers");
  homeTheater.endWatchingMovie();

  console.log();
}

main()
