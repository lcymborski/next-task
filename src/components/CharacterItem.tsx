import { useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useIntersection } from '@next-task/hooks'
import CharacterStatus from '@next-task/components/CharacterStatus'

interface CharacterItemProps {
  id: number
  name: string
  status: string
  image: string
  appearances: string
}

const CharacterItem = ({ id, name, status, image, appearances }: CharacterItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const isVisible = useIntersection(ref)

  const handleClick = useCallback(() => router.push(`/characters/${id}`), [router, id])

  if (!isVisible) {
    return <div className="flex mb-8 bg-white h-32" ref={ref}></div>
  }

  return (
    <div id={`${id}`} className="flex card cursor-pointer" ref={ref} onClick={handleClick}>
      <Image
        src={image}
        alt={name}
        width={150}
        height={150}
        className="rounded-l-lg object-cover w-32 h-32"
      />
      <div className="flex flex-col justify-between px-2 py-2 leading-none">
        <div>
          <div className="text-xl font-extrabold text-slate-600 tracking-tight">{name}</div>
          <CharacterStatus status={status} />
        </div>
        <div>
          <div className="label pb-1">Appearances by season</div>
          <div className="text-slate-800">{appearances}</div>
        </div>
      </div>
    </div>
  )
}

export default CharacterItem
