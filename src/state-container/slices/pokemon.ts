import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type PokemonDto = {
  species: {
    name: string;
  };
  sprites: {
    name: string;
    front_shiny: string;
  };
};

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemonByName: builder.query<PokemonDto, string>({
      query: name => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
