// based on: https://github.com/afuh/rick-and-morty-api-node/blob/master/src/interfaces.ts

export interface ResourceBase {
  id: number
  name: string
  url: string
  created: string
}

export interface CharacterLocation {
  name: string
}

export interface CharacterOrigin {
  name: string
}

export interface Episode {
  episode: string
}

export interface CharacterResponse extends ResourceBase {
  status: 'Dead' | 'Alive' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: CharacterLocation
  location: CharacterLocation
  image: string
  episode: Episode[]
}

export interface Character extends CharacterResponse {
  appearances: string
}

export interface PaginatedCharactersResponse {
  data: {
    characters: {
      info?: {
        /** The length of the response */
        count: number
        /** The amount of pages */
        pages: number
        /** Link to the next page (if it exists) */
        next: string | null
        /** Link to the previous page (if it exists) */
        prev: string | null
      }
      results?: CharacterResponse[]     
    }
  }
}

export interface SingleCharacterResponse {
  data: {
    character: CharacterResponse
  }
}

export interface EpisodeResponse {
  id: number
  characters: {
    id: number
  }[]
}

export interface PaginatedEpisodesResponse {
  data: {
    episodes: {
      info?: {
        /** The length of the response */
        count: number
        /** The amount of pages */
        pages: number
        /** Link to the next page (if it exists) */
        next: string | null
        /** Link to the previous page (if it exists) */
        prev: string | null
      }
      results?: EpisodeResponse[]     
    }
  }
}
