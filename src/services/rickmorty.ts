import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import type { Character, PaginatedCharactersResponse } from '@next-task/services/types'
import queries from '@next-task/services/queries'
import { getAppearances } from '@next-task/services/utils'

// for keeping the characters list in normalized structure
// and avoiding duplicates
export const charactersAdapter = createEntityAdapter<Character>({
  selectId: (character) => character.id,
  sortComparer: (a, b) => a.id - b.id,
});

// extend with extra fields to store pagination info
type CharacterEntityState = EntityState<Character> & {
  page: number | null
  hasMorePages: boolean
}

const { selectAll: selectAllEntities } = charactersAdapter.getSelectors();

// we're just using RTK Query for fetching the next page
// and storing the data in normalized state
export const rickmortyApi = createApi({
  reducerPath: 'rickmortyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
    timeout: 30000,
  }),
  endpoints: (builder) => ({
    // pass page 0 to force reset and refresh (fetch page 1),
    getCharacters: builder.query<CharacterEntityState, number>({
      // keep in cache up to 15 minutes after unmounting
      keepUnusedDataFor: 900,
      query: (page) => ({
        url: 'graphql',
        method: 'POST',
        body: JSON.stringify({
          query: queries.characters,
          variables: { page: (page === -1 || page === 0) ? 1 : page },
          operationName: 'getCharacters',
        })
      }),
      // add new characters to normalized state
      transformResponse: (responseData: PaginatedCharactersResponse, meta, arg) => {
        const characters: Character[] = responseData.data.characters.results?.map((character) => ({
          ...character,
          appearances: getAppearances(character.episode),
        })) ?? []
        return charactersAdapter.addMany(
          charactersAdapter.getInitialState({
            page: (arg === -1 || arg === 0) ? 1 : arg,
            hasMorePages: !!responseData.data.characters.info?.next,
          }),
          characters,
        )
      },
      // make sure we have only one cache entry
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // merge incoming data (after the normalization in transformResponse) to the cache entry
      merge: (currentCache, newData, { arg }) => {
        // check if pull-to-refresh (remove old data and add new)
        if (arg === 0) {
          return charactersAdapter.addMany(charactersAdapter.getInitialState({
            page: newData.page,
            hasMorePages: newData.hasMorePages,          
          }), selectAllEntities(newData))
        }
        return charactersAdapter.addMany({
          ...currentCache,
          page: newData.page,
          hasMorePages: newData.hasMorePages,          
        }, selectAllEntities(newData))
      },
      // fetch when page changes
      forceRefetch({ currentArg, previousArg }) {
        return (currentArg !== previousArg)
      },
    }),
  }),
})

export const { useGetCharactersQuery } = rickmortyApi
