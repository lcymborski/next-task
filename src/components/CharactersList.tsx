import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectAllCharacters } from '@next-task/services/selectors'
import CharacterItem from '@next-task/components/CharacterItem'

interface CharactersListProps {
  onReset: () => void
}

const CharactersList = ({ onReset }: CharactersListProps) => {
  const characters = useSelector(selectAllCharacters)

  const handleReset = useCallback(() => {
    if (onReset) {
      onReset()
    }
  }, [onReset])

  return (
    <>
      {characters.length > 0 && (
        <div className="flex justify-end pb-4">
          <button className="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
      <div>
        {characters.map((character, i) => (
          <CharacterItem
            key={character.id}
            id={character.id}
            name={character.name}
            status={character.status}
            image={character.image}
            appearances={character.appearances}
          />
        ))}
      </div>
    </>
  )
}

export default CharactersList
