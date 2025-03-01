/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

import { COLORS } from "../helpers/colors.ts";

//? Implementación del patrón Composite en un sistema de archivos 
interface FileSystemComponent{
  showDetails(indent?: string): void;
}

//? Clase de patron composite que representa un archivo en el sistema de archivos 
class File implements FileSystemComponent {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  showDetails(indent: string = '') {
    console.log(`%c${indent}📄 Archivo: ${this.name}`,COLORS.green);
  }
}

//? Clase de patron composite que representa una carpeta en el sistema de archivos
class Folder implements FileSystemComponent {
  private name: string;
  //? Este arreglo permite el sistema de archivos compuesto por archivos y carpetas 
  private contents: FileSystemComponent[] = [];

  constructor(name: string) {
    this.name = name;
  }

  add(component: FileSystemComponent) {
    this.contents.push(component);
  }

  showDetails(indent: string = '') {
    console.log(`%c${indent}📂 Carpeta: ${this.name}`,COLORS.yellow);

    this.contents.forEach((component) => {
      component.showDetails(indent + ' ');
    });
  }
}

function main() {
  console.log();

  const file1 = new File('file1.txt');
  const file2 = new File('file2.txt');
  const file3 = new File('file3.txt');
  const file4 = new File('file4.txt');
  
  const folder1 = new Folder('folder1');
  const folder5 = new Folder('folder5');
  folder1.add(file1);
  folder1.add(file2);
  
  const folder2 = new Folder('folder2');
  folder2.add(file3);
  folder2.add(folder5);

  const folder3 = new Folder('folder3');
  folder3.add(file4);
  folder2.add(folder3);

  const rootFolder = new Folder('root');
  rootFolder.add(folder1);
  rootFolder.add(folder2);

  rootFolder.showDetails();

  console.log();
  
}

main();

