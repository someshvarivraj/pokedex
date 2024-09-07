import { z } from "zod";
import {db} from "../../db"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// export const postRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   create: publicProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ ctx, input }) => {
//       return ctx.db.post.create({
//         data: {
//           name: input.name,
//         },
//       });
//     }),

//   getLatest: publicProcedure.query(async ({ ctx }) => {
//     const post = await ctx.db.post.findFirst({
//       orderBy: { createdAt: "desc" },
//     });

//     return post ?? null;
//   }),
// });
// export const pokemonRouter = router({
//   getPokemonByName: procedure
//     .input(z.string())
//     .query(async ({ input }) => {
//       return await prisma.pokemon.findUnique({
//         where: { name: input },
//       });
//     })});

export const pokemonRouter = createTRPCRouter({
  getPokemonByNames: publicProcedure
  .input(z.object({
    names: z.array(z.string()), // Always expect an array of names
  }))
  .query(async ({ input }) => {
    return await db.pokemon.findMany({
      where: {
        name: {
          in: input.names, // Match multiple names
        },
      },
      select: {
        name: true,
        sprite: true,
        types: {
          select: {
            type: {
              select: {
                name: true, // Only include the name of the type
              },
            },
          },
        },
      },
    });
  }),

  getPokemonsByTypes: publicProcedure
  .input(z.object({name:z.string()}))
  .query(async ({input}) => {
    return await db.pokemonType.findUnique({
      where:{
        name:input.name
      },
      select:{
        pokemons:{
          select:{
            pokemon:{
              select:{
                name:true,
                sprite:true,
                types: {
                  select: {
                    type: {
                      select: {
                        name: true, // Only include the name of the type
                      },
                    },
                  },
                },
              }
            }
          }
        }
      }
    })
  })
})