interface EmptyStateProps {
  children?: React.ReactNode
}

const EmptyState = ({ children }: EmptyStateProps) => (
  <div className="flex flex-col justify-center items-center pt-24">
    {children}
    <div className="mt-6 text-slate-400 text-3xl font-extrabold">Pull to load data</div>
  </div>
)

export default EmptyState
