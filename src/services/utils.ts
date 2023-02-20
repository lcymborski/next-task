import type { Episode, PaginatedEpisodesResponse, SingleCharacterResponse, Character } from '@next-task/services/types'
import queries from '@next-task/services/queries'

// calculate appearances by season
export const getAppearances = (episodes: Episode[]) => {
  const seasons = episodes.map(({ episode }) => episode.substring(0, 3)).sort()
  const aggregated = seasons.reduce((prev, season) => ({ ...prev, [season]: (prev[season] ?? 0) + 1 }), {} as Record<string, number>)
  return Object.entries(aggregated).map(([season, count]) => `${season}: ${count}`).join(', ')
}

export const fetchEpisodes = async (page: number) : Promise<PaginatedEpisodesResponse> => {
  const response = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      query: queries.episodes,
      variables: { page },
      operationName: 'getEpisodes',
    })
  })

  if (!response.ok) {
    throw Error(`fetchEpisodes error, status code ${response.status}`);
  }

  return response.json()
}

export const fetchAllCharacterIds = async () => {
  // get the first page
  const response = await fetchEpisodes(1)
  const { pages = 0 } = response.data.episodes?.info ?? {}
  const characters = [response.data.episodes.results]
  // next calls in batches
  if (pages > 1) {
    const remainingPages = Array.from({ length: pages - 1 }, (_, i) => i + 2)
    const batchSize = 3
    const chunks = Array.from({ length: Math.ceil(remainingPages.length / batchSize) }, (v, i) =>
      remainingPages.slice(i * batchSize, i * batchSize + batchSize)
    );
    for (let i = 0; i < chunks.length; i++) {
      const responses = await Promise.all(chunks[i].map(page => fetchEpisodes(page)));
      characters.push(...responses.map(resp => resp.data.episodes.results))
    }
  }
  // get unique character ids
  return Array.from(new Set(characters.flat().map((episode) => (episode?.characters.map(({ id }) => id))).flat()))
}

export const fetchCharacter = async (id: number): Promise<Character> => {
  const response = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      query: queries.character,
      variables: { id },
      operationName: 'getCharacter',
    })
  })

  if (!response.ok) {
    throw Error(`fetchCharacter error, status code ${response.status}`);
  }

  const data: SingleCharacterResponse = await response.json()

  return {
    ...data.data.character,
    appearances: getAppearances(data.data.character.episode),
  }
}
