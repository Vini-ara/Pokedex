import { useRef, useLayoutEffect } from "react";

const isBrowser = typeof window !== 'undefined';

function getScrollPosition({element, useWindow}) {
  if (!isBrowser) return {x: 0, y:0}

  const target = element ? element.current : document.body
  const position = target.getBoundingClientRect()

  return useWindow 
    ? { x: window.scrollX, y: window.scrollY} 
    : { x: position.left, y: position.top }  
}

export function useScrollPosition(effect, deps, element, useWindow) {
  const position = useRef(getScrollPosition({useWindow}))

  useLayoutEffect(() => {
    let throttleTimeout = null;

    const callBack = () => {
      const currPos = getScrollPosition({element, useWindow})
      effect({ prevPos: position.current, currPos})
      position.current = currPos
      throttleTimeout = null
    }

    const handleScroll = () => {   
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(callBack, 100)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  
  })
}
