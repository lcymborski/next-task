interface DetailsItemProps {
  label: string
  value: string
}

const DetailsItem = ({ label, value }: DetailsItemProps) => (
  <div className="py-4">
    <div className="label">{label}</div>
    <div className="text-slate-800">{value}</div>
  </div>
)

export default DetailsItem
