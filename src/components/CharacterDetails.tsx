import Image from 'next/image'
import Link from 'next/link'
import CharacterStatus from '@next-task/components/CharacterStatus'
import DetailsItem from '@next-task/components/DetailsItem'

interface CharacterDetailsProps {
  id: number
  name: string
  status: string
  image: string
  species: string
  type: string
  gender: string
  origin: string
  location: string
  appearances: string
}

const CharacterDetails = ({
  id,
  name,
  status,
  image,
  species,
  type,
  gender,
  origin,
  location,
  appearances,
}: CharacterDetailsProps) => {
  return (
    <div className="mt-12">
      <div className="flex justify-end py-4">
        <Link href="/" scroll={false} className="button-link">
          ↩ Back
        </Link>
      </div>
      <div className="flex">
        <Image
          src={image}
          alt={name}
          width={150}
          height={150}
          className="rounded-full w-24 h-24 border border-slate-300"
        />
        <div className="flex flex-col justify-center pl-6">
          <h1 className="text-2xl font-bold text-slate-600 tracking-tight">{name}</h1>
          <CharacterStatus status={status} />
        </div>
      </div>
      <div className="card mt-6">
        <div className="px-4">
          <DetailsItem label="Location" value={location} />
        </div>
        <hr className="h-px bg-slate-200 border-0" />
        <div className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <DetailsItem label="Type" value={type} />
            <DetailsItem label="Species" value={species} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <DetailsItem label="Gender" value={gender} />
            <DetailsItem label="Origin" value={origin} />
          </div>
          <DetailsItem label="Appearances by season" value={appearances} />
        </div>
      </div>
    </div>
  )
}

export default CharacterDetails
