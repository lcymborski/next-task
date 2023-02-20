import { useEffect, useRef } from 'react'
import { useIntersection } from '@next-task/hooks'

interface SentinelProps {
  onShow?: () => void
}

const Sentinel = ({ onShow }: SentinelProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(ref, false, 300)

  useEffect(() => {
    if (isVisible && onShow) {
      onShow()
    }
  }, [isVisible, onShow])

  return <div className="flex mb-8 bg-transparent h-4" ref={ref} />
}

export default Sentinel
