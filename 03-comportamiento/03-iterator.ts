/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */

//* Interfaz Iterator
interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
  current(): T | null;
}

//* Clase Iterator de Pokemon
class Pokemon {
  constructor(public name: string, public type: string) {}
}

//* Clase Collection de Pokemon para almacenar los elementos
class PokemonCollection {
  private pokemons: Pokemon[] = [];

  addPokemon(pokemon: Pokemon): void {
    this.pokemons.push(pokemon);
  }

  getPokemonAt(index: number): Pokemon | null {
    if (index >= 0 && index < this.pokemons.length) {
      return this.pokemons[index];
    }

    return null;
  }

  getLength(): number {
    return this.pokemons.length;
  }

  // TODO: Método que crea un iterador de la colección
  createIterator(): PokemonIterator {
    return new PokemonIterator(this);
  }
}

//* Clase Iterator de Pokemon
class PokemonIterator implements Iterator<Pokemon> {
  private collection: PokemonCollection;
  private position = 0;

  constructor(collection: PokemonCollection) {
    this.collection = collection;
  }

  next(): Pokemon | null {
    if (this.hasNext()) {
      return this.collection.getPokemonAt(this.position++);
    }

    return null;
  }

  hasNext(): boolean {
    return this.position < this.collection.getLength();
  }

  current(): Pokemon | null {
    return this.collection.getPokemonAt(this.position);
  }
}


function main() {
  console.log();

  const pokedex = new PokemonCollection();
  pokedex.addPokemon(new Pokemon('Pikachu', 'Electrico'));
  pokedex.addPokemon(new Pokemon('Charmander', 'Fuego'));
  pokedex.addPokemon(new Pokemon('Squirtle', 'Agua'));
  pokedex.addPokemon(new Pokemon('Bulbasaur', 'Planta'));
  pokedex.addPokemon(new Pokemon('Jigglypuff', 'Normal'));

  const iterator = pokedex.createIterator();
  while (iterator.hasNext()) {
    const pokemon = iterator.next();
    console.log(`Pokemon: ${pokemon?.name} - Tipo: ${pokemon?.type}`);
  }

  console.log();
}

main();
