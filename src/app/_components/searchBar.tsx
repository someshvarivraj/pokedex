"use client";

import React from "react";
import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import PokemonRow from "./pokemonRow";
import Filter from "./filter";

interface PokemonType {
  type: {
    name: string;
  };
}

export default function SearchBar() {
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>(""); // Raw input
  const [shouldFetch, setShouldFetch] = useState(false);

  const [fetchedPokemonList, setFetchedPokemonList] = useState<
    {
      name: string;
      sprite: string;
      types: PokemonType[];
    }[]
  >([]);

  const {
    data: pokemons,
    isLoading,
    isError,
  } = api.pokemon.getPokemonByNames.useQuery(
    { names: pokemonNames }, // Array of names
    {
      enabled: shouldFetch && pokemonNames.length > 0, // Only fetch when there are names
    },
  );

  useEffect(() => {
    if (pokemons) {
      setFetchedPokemonList(pokemons); // Store the fetched data in state
      setShouldFetch(false);
    }
  }, [pokemons]);

  const handleClick = () => {
    // Split the input value into an array of names, trimming whitespace
    const names = inputValue
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (names.length > 0) {
      setPokemonNames(names);
      setShouldFetch(true);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Enter Pokémon names"
          className="input input-bordered m-2 w-full max-w-xs"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* <Button
          className="btn m-2 bg-blue-500 text-black" // Change `bg-blue-500` to your desired background color class
          onClick={handleClick}
        >
          Search
        </Button> */}
        <button className="btn btn-primary m-2" onClick={handleClick}>
          Search
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching Pokémon data</p>}

      {fetchedPokemonList.length > 0 && (
        <div className="m-10">
          {fetchedPokemonList.map((pokemon, index) => (
            <PokemonRow key={index} {...pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}
