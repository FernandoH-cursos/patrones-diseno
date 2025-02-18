/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

import { COLORS } from "../helpers/colors.ts";

type Lenguage = "es" | "en" | "fr";

// i18n
//* Factory Function que nos permite crear funciones que saludan en diferentes
//* idiomas
function createGreeter(lang: Lenguage) {
  return function (name: string) {
    const messages = {
      es: `Hola, %c${name}!`,
      en: `Hello, %c${name}!`,
      fr: `Bonjour, %c${name}!`,
    };

    console.log(messages[lang], COLORS.red);
  };
}

function main() {
  console.log();

  const greetInSpanish = createGreeter("es");
  const greetInEnglish = createGreeter("en");
  const greetInFrench = createGreeter("fr");

  greetInSpanish("Fernando");
  greetInEnglish("Alice");
  greetInFrench("Pierre");

  console.log();
}

main();