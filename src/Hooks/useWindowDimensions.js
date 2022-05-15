import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const {innerHeight: height, innerWidth: width} = window;

  return {
    height, 
    width
  }
}

export function useWindowDimensions() {
  const [windowDimension, setWindowDiemnsion] = useState(getWindowDimensions())
  
  useEffect(() => {
    function handleResize() {
      setWindowDiemnsion(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return windowDimension
}
