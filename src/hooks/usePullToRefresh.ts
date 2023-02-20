import { useCallback, useEffect, useRef, useState } from 'react'

interface PullToRefreshInterface {
  onRefresh?: () => void
  // pull threshold in px that triggers refresh
  threshold?: number
}

interface PullToRefreshInfo {
  isPulling: boolean
  thresholdBreached: boolean
  distance: number
}

// helper for handling desktop/mobile
const getY = (e: MouseEvent | TouchEvent) => {
  let currentY = 0
  if (e instanceof MouseEvent) {
    currentY = e.pageY;
  }
  if (window.TouchEvent && e instanceof TouchEvent) {
    currentY = e.touches[0].pageY;
  }
  return currentY
}

const units = 6

const usePullToRefresh = ({ onRefresh, threshold = 100 }: PullToRefreshInterface): PullToRefreshInfo => {
  const [isPulling, setIsPulling] = useState(false)
  const [thresholdBreached, setThresholdBreached] = useState(false)
  // distance from threshold in arbitrary units (units - 0)
  // for visualizing pull progress
  const [distance, setDistance] = useState(units)
  const isDraggingRef = useRef(false)
  const breachedRef = useRef(false)
  const startYRef = useRef(0)

  const handleStart = useCallback((e: MouseEvent | TouchEvent) => {
    if (e instanceof MouseEvent) {
      // ignore if page not scrolled to the top
      if (window.scrollY > 30) {
        return
      }
      // prevent text selection to simulate pull-to-refresh in desktop
      e.preventDefault()
    }
    startYRef.current = getY(e)
    setIsPulling(true)
    isDraggingRef.current = true
    breachedRef.current = false
  }, [setIsPulling])

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (isDraggingRef.current) {
      const y = getY(e)
      const currentDistance = Math.ceil((y - startYRef.current) / (threshold / units))
      setDistance(units - Math.min(Math.max(0, currentDistance), units))
      breachedRef.current = (y - startYRef.current) >= threshold;
      if (breachedRef.current) {
        setThresholdBreached(true)
      }
    }
  }, [isDraggingRef, startYRef, breachedRef, threshold, setThresholdBreached, setDistance])

  const handleEnd = useCallback((e: MouseEvent | TouchEvent) => {
    setIsPulling(false)
    setThresholdBreached(false)
    setDistance(5)
    isDraggingRef.current = false
    startYRef.current = 0
    if (onRefresh && breachedRef.current) {
      onRefresh()
    }
    breachedRef.current = false
  }, [setIsPulling, setThresholdBreached, onRefresh, isDraggingRef, startYRef])

  useEffect(() => {
    // handle events in desktop/mobile
    document.addEventListener('touchstart', handleStart);
    document.addEventListener('mousedown', handleStart);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('mouseleave', handleEnd);

    return () => {
      document.removeEventListener('touchstart', handleStart);
      document.removeEventListener('mousedown', handleStart);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('mouseleave', handleEnd);
    };
  }, [handleStart, handleMove, handleEnd])

  return { isPulling, thresholdBreached, distance }
}

export default usePullToRefresh
