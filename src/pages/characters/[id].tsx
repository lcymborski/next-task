import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next'
import { fetchAllCharacterIds, fetchCharacter } from '@next-task/services/utils'
import { Character } from '@next-task/services/types'
import CharacterDetails from '@next-task/components/CharacterDetails'

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await fetchAllCharacterIds()

  return {
    paths: ids.map((id) => ({ params: { id: `${id}` } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<{ character: Character }> = async (context) => {
  const id = context.params?.id as string

  try {
    const character = await fetchCharacter(parseInt(id))

    return {
      props: {
        character,
      },
    }
  } catch (error: any) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

type DetailsPageProps = InferGetStaticPropsType<typeof getStaticProps>

const DetailsPage: NextPage<DetailsPageProps> = ({ character }) => (
  <CharacterDetails
    key={character.id}
    id={character.id}
    name={character.name}
    status={character.status}
    image={character.image}
    species={character.species}
    type={character.type}
    gender={character.gender}
    origin={character.origin.name}
    location={character.location.name}
    appearances={character.appearances}
  />
)

export default DetailsPage
