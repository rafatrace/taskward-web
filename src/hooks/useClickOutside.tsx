import { useEffect, useRef } from 'react'

const useClickOutside = <T extends HTMLDivElement | HTMLUListElement>(action: (...args: unknown[]) => unknown) => {
  // Instantiate node ref
  const nodeRef = useRef<T>(null)

  // Listen to outside element clicks
  useEffect(() => {
    const handler = (e: any) => {
      if (
        nodeRef?.current != null &&
        !nodeRef.current.contains(e.target as HTMLDivElement) &&
        e.target?.dataset?.ignoreClickOutside == null
      ) {
        action()
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  })

  return nodeRef
}

export default useClickOutside
