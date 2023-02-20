import { usePullToRefresh } from '@next-task/hooks'
import cx from 'classnames'

interface RefreshIndicatorProps {
  onRefresh: () => void
  showIdle?: boolean
}
const styles = {
  wrapper: 'flex justify-center text-3xl',
  symbol:
    'rounded-full shadow-sm border border-slate-200 bg-white text-blue-400 w-12 h-12 inline-flex justify-center items-center',
  placeholder:
    'rounded-full border border-transparent bg-transparent w-12 h-12 inline-flex justify-center items-center',
  dot: 'rounded-full border border-blue-400 bg-blue-400 transition ease-in-out',
  // for Tailwind to find those classes
  widths: ['w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-7', 'w-8'],
  heights: ['h-2', 'h-3', 'h-4', 'h-5', 'h-6', 'h-7', 'h-8'],
}

const RefreshIndicator = ({ onRefresh, showIdle }: RefreshIndicatorProps) => {
  const { isPulling, distance } = usePullToRefresh({ onRefresh })

  if (!isPulling && !showIdle) {
    return (
      <div className={styles.wrapper}>
        <span className={styles.placeholder}>&nbsp;</span>
      </div>
    )
  }

  if (!isPulling && showIdle) {
    return (
      <div className={cx(styles.wrapper, 'animate-bounce')}>
        <span className={styles.symbol}>↓</span>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.symbol}>
        <div className={cx(styles.dot, styles.widths[distance], styles.heights[distance])} />
      </div>
    </div>
  )
}

export default RefreshIndicator
