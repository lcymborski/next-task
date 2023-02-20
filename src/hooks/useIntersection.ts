import { RefObject, useCallback, useEffect, useState } from 'react'

const useIntersection = (
  elementRef: RefObject<Element>,
  ignoreVisited = false,
  // how far outside the viewport to look for intersection
  offset = 1200,
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  const updateStatus = useCallback((status: boolean) => {
    if (ignoreVisited) {
      setIsIntersecting(prev => prev || status)
    } else {
      setIsIntersecting(status)
    }
  }, [setIsIntersecting, ignoreVisited])

  useEffect(() => {
    const elem = elementRef?.current
    const isSupported = !!window?.IntersectionObserver

    if (!isSupported || !elem) return

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (typeof window !== undefined && window.requestIdleCallback) {
        // try to run during the browser idle periods
        // (optimize performance for lazy loading/scrolling)
        window.requestIdleCallback(
          () => updateStatus(entries[0].isIntersecting),
          {
            timeout: 600
          }
        )
      } else {
        updateStatus(entries[0].isIntersecting)
      }
    }

    const options = { threshold: 0, root: null, rootMargin: `${offset}px 0px ${offset}px 0px` }
    const observer = new IntersectionObserver(callback, options)

    observer.observe(elem)

    return () => observer.disconnect()
  }, [elementRef, offset, setIsIntersecting, updateStatus])

  return isIntersecting
}

export default useIntersection
