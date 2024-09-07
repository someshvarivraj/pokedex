import { PrismaClient } from '@prisma/client'
//import pd from '../pokData/pokemonData'

let prisma = new PrismaClient();

const pd =[
    {
      "name": "Bulbasaur",
      "types": ["grass", "poison"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    },
    {
      "name": "Ivysaur",
      "types": ["grass", "poison"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
    },
    {
      "name": "Venusaur",
      "types": ["grass", "poison"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
    },
    {
      "name": "Charmander",
      "types": ["fire"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
    },
    {
      "name": "Charmeleon",
      "types": ["fire"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
    },
    {
      "name": "Charizard",
      "types": ["fire", "flying"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
    },
    {
      "name": "Squirtle",
      "types": ["water"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
    },
    {
      "name": "Wartortle",
      "types": ["water"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png"
    },
    {
      "name": "Blastoise",
      "types": ["water"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png"
    },
    {
      "name": "Caterpie",
      "types": ["bug"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png"
    },
    {
      "name": "Metapod",
      "types": ["bug"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png"
    },
    {
      "name": "Butterfree",
      "types": ["bug", "flying"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png"
    },
    {
      "name": "Weedle",
      "types": ["bug", "poison"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png"
    },
    {
      "name": "Kakuna",
      "types": ["bug", "poison"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png"
    },
    {
      "name": "Beedrill",
      "types": ["bug", "poison"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png"
    },
    {
      "name": "Pidgey",
      "types": ["normal", "flying"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png"
    },
    {
      "name": "Pidgeotto",
      "types": ["normal", "flying"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png"
    },
    {
      "name": "Pidgeot",
      "types": ["normal", "flying"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png"
    },
    {
      "name": "Rattata",
      "types": ["normal"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png"
    },
    {
      "name": "Raticate",
      "types": ["normal"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png"
    },
    {
      "name": "Jigglypuff",
      "types": ["normal", "fairy"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png"
    },
    {
      "name": "Wigglytuff",
      "types": ["normal", "fairy"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png"
    },
    {
      "name": "Zubat",
      "types": ["poison", "flying"],
      "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png"
    }
  ]
  
const pokemonData = pd;
  
  async function insertPokemonData() {
    for (const pokemon of pokemonData) {
      
      const createdPokemon = await prisma.pokemon.create({
        data: {
          name: pokemon.name,
          sprite: pokemon.sprite,
        },
      });
  
      
      for (const type of pokemon.types) {
        
        const existingType = await prisma.pokemonType.upsert({
          where: { name: type },  
          update: {},  // Do nothing if it exists
          create: { name: type },  
        });
  
        // Now, link the Pokemon 
        await prisma.pokemonToType.create({
          data: {
            pokemonId: createdPokemon.id,
            typeId: existingType.id,
          },
        });
      }
    }
  }
  
  
  insertPokemonData()
    .then(() => {
      console.log("Pokémon data inserted successfully!");
    })
    .catch((error) => {
      console.error("Error inserting Pokémon data:", error);
    });
  