import { useRef, useEffect } from 'react'

function useUpdatedCallback(callback: any, dependencies: any[]) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback, ...dependencies])

  return () => {
    return callbackRef.current()
  }
}

export default useUpdatedCallback
