import { useState, useEffect, useCallback } from 'react'

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState('')

  const handleResize = useCallback(() => {
    if(window.innerWidth <= 768) {
      setDeviceType('mobile')
    } 
    else {
      setDeviceType('desktop')
    }
  }, [])

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return deviceType
}

export default useDeviceType