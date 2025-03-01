/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria RAM que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

import { COLORS } from "../helpers/colors.ts";

interface Location {
  display(coordinates: { x: number; y: number }): void;
}

//* Flyweight
class LocationIcon implements Location {
  private type: string; // Tipo de marcador (hospital, escuela, etc)
  private iconImage: string; // Imagen del marcador

  constructor(type: string, iconImage: string) {
    this.type = type;
    this.iconImage = iconImage;
  }

  display(coordinates: { x: number; y: number }): void {
    console.log(
      `Coords: ${this.type} en (${coordinates.x}, ${coordinates.y}) con ícono %c[${this.iconImage}]`,
      COLORS.green
    );
  }
}

// * Flyweight Factory
class LocationFactory {
  private icons: Record<string, LocationIcon> = {};

  getLocationIcon(type: string): LocationIcon {
    if (!this.icons[type]) {
      console.log(`%cCreando una instancia del ícono de ${type}`,COLORS.red);
      const iconImage = `image_de_${type.toLowerCase()}.png`;

      this.icons[type] = new LocationIcon(type, iconImage);
    }
    return this.icons[type];
  }
}

//* Un objeto que representa una ubicación en el mapac con un marcador  
class MapLocation {
  private coordinates: { x: number; y: number };
  private icon: LocationIcon;

  constructor(x: number, y: number, icon: LocationIcon) {
    this.coordinates = { x, y };
    this.icon = icon;
  }

  display(): void {
    this.icon.display(this.coordinates);
  }
}


//* Implementación del cliente 
function main() {
  console.log();

  //* Crear el mapa con los marcadores 
  const factory = new LocationFactory();

  const locations: MapLocation[] = [
    new MapLocation(10, 20, factory.getLocationIcon("hospital")),
    new MapLocation(3, 4, factory.getLocationIcon("escuela")),
    new MapLocation(5, 6, factory.getLocationIcon("hospital")),
    new MapLocation(7, 8, factory.getLocationIcon("escuela")),
    new MapLocation(9, 10, factory.getLocationIcon("hospital")),
  ];

  locations.forEach((location) => location.display());

  console.log();
}

main();
