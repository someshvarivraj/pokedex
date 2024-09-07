import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";

interface PokemonRowProps {
  name: string;
  types: PokemonType[];
  sprite: string;
}
interface PokemonType {
  type: {
    name: string;
  };
}

const PokemonRow = ({ name, sprite, types }: PokemonRowProps) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="avatar flex justify-center">
        <div className="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
          <img src={sprite} />
        </div>
      </div>
      <div className="card-body flex items-center text-center">
        <h2 className="card-title">{name}</h2>
        <div className="flex space-x-2">
          {types.map((t, index) => (
            <div key={index} className="badge badge-accent">
              {t.type.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonRow;
