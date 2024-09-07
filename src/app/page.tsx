import Link from "next/link";

//import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import SearchBar from "./_components/searchBar";
import Filter from "./_components/filter";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const data = await api.pokemon.getPokemonByName({ name: "Bulbasaur" });

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex">
          <SearchBar />
          <Filter />
        </div>
      </main>
    </HydrateClient>
  );
}
