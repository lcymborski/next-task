const statusStyles: Record<string, string> = {
  Alive: 'text-green-500',
  Dead: 'text-red-500',
  unknown: 'text-gray-500',
}

interface CharacterStatusProps {
  status: string
}

const CharacterStatus = ({ status }: CharacterStatusProps) => (
  <div className="text-slate-600 text-sm">
    <span className={statusStyles[status]}>●</span> {status}
  </div>
)

export default CharacterStatus
