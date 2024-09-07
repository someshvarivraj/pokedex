import React from "react";
import PokemonRow from "./pokemonRow";

interface PokemonType {
    type: {
      name: string;
    };
  }

interface Pokemon {
  name: string;
  sprite: string;
  types: PokemonType[]; // Include types inside each Pokemon object
}

interface PokemonsProps {
  pokemons: Pokemon[];
}

const Pokemons = ({ pokemons }: PokemonsProps) => {
  return (
    <div>
      {pokemons.map((pokemon, index) => (
        <PokemonRow
          key={index}
          name={pokemon.name}
          sprite={pokemon.sprite}
          types={pokemon.types} // Pass the types here
        />
      ))}
    </div>
  );
};

export default Pokemons;
