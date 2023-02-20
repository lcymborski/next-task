// we can use the available GraphQL API
// to get all the needed fields/associated models with one query
const queries = {
  characters: `
    query getCharacters($page: Int) {
      characters(page: $page) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          image
          status
          type
          gender
          species
          episode {
            episode
          }
          origin {
            name
          }
          location {
            name
          }
        }
      }
    }    
  `,
  episodes: `
    query getEpisodes($page: Int) {
      episodes(page: $page) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          characters {
            id
          }
        }
      }
    }
  `,
  character: `
    query getCharacter($id: ID!) {
      character(id: $id) {
        id
        name
        image
        status
        type
        gender
        species
        episode {
          episode
        }
        origin {
          name
        }
        location {
          name
        }
      }
    }
  `,
}

export default queries