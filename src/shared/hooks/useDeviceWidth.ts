import { useState } from "react"

export const useDeviceWidth = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const handleResize = () => {
        setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return width
}
