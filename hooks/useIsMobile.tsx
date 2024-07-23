import { useEffect, useState } from "react"

const useIsMobile = ():boolean => {
  const [isMobile,setIsmobile] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      if(typeof window !== undefined){
        setIsmobile(window.innerWidth <= 640)
      }
    }
    handleWindowResize()

    window.addEventListener('resize',handleWindowResize)

    return () => window.removeEventListener('resize',handleWindowResize)
  })

  return isMobile
}

export default useIsMobile;