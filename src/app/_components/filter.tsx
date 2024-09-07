"use client";

import React from "react";
import { api } from "~/trpc/react";
import { useState } from "react";
import Pokemons from "./pokemons";
export default function Filter() {
  const [selectedType, setSelectedType] = useState("");
  const {
    data: pokemonData,
    isLoading,
    isError,
  } = api.pokemon.getPokemonsByTypes.useQuery(
    { name: selectedType ?? "" },
    { enabled: !!selectedType },
  );
  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };
  const transformedPokemons =
    pokemonData?.pokemons.map((p) => ({
      name: p.pokemon.name,
      sprite: p.pokemon.sprite,
      types: p.pokemon.types.map((t) => ({ type: { name: t.type.name } })), // Flatten the type structure
    })) || [];
  return (
    <div>
      <div className="dropdown dropdown-bottom">
        <div tabIndex={0} role="button" className="btn relative m-2">
          <img src="/filter.png" alt="Filter" className="h-6 w-6" />
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
        >
          {[
            "Grass",
            "Poison",
            "Fire",
            "Flying",
            "Water",
            "Bug",
            "Normal",
            "Fairy",
            "🚫None",
          ].map((type) => (
            <li key={type}>
              <a onClick={() => handleTypeSelect(type)}>{type}</a>
            </li>
          ))}
        </ul>
      </div>
      {/* Display fetched Pokémon */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching Pokémon data</p>}
      {transformedPokemons.length > 0 && (
        <div>
          <Pokemons pokemons={transformedPokemons} />{" "}
          {/* Pass transformed data */}
        </div>
      )}
    </div>
  );
}
