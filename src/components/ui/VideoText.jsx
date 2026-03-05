"use client"

import React, { useEffect, useState } from "react"
import { cn } from "../../lib/utils"

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  mobileFontSize = null,
  fontWeight = "800",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
}) {
  const [svgMask, setSvgMask] = useState("")
  const content = React.Children.toArray(children).join("")

  useEffect(() => {
    const updateSvgMask = () => {
      const isMobile = window.innerWidth < 768
      const activeFontSize = isMobile && mobileFontSize != null ? mobileFontSize : fontSize
      const responsiveFontSize = 
        typeof activeFontSize === "number" ? `${activeFontSize}vw` : activeFontSize 
      
      const xPos = textAnchor === "start" ? "0%" : textAnchor === "end" ? "100%" : "50%"
      
      const newSvgMask = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <text x="${xPos}" y="75%" font-size="${responsiveFontSize}" font-weight="${fontWeight}" text-anchor="${textAnchor}" font-family="${fontFamily}" letter-spacing="-0.05em" fill="black">${content}</text>
      </svg>`
      setSvgMask(newSvgMask)
    }

    updateSvgMask()
    window.addEventListener("resize", updateSvgMask)
    return () => window.removeEventListener("resize", updateSvgMask)
  }, [content, fontSize, mobileFontSize, fontWeight, textAnchor, dominantBaseline, fontFamily])
  
  const dataUrlMask = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgMask)}")`;

  return (
    <Component className={cn(`relative overflow-hidden`, className)}>
      <div
        className="absolute inset-0 flex items-center justify-center w-full h-full"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "left center",
          WebkitMaskPosition: "left center",
          backgroundColor: 'transparent'
        }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} />
        </video>
      </div>

      <span className="sr-only">{content}</span>
      
      <div aria-hidden="true" className="opacity-0 select-none pointer-events-none whitespace-nowrap" style={{ 
          fontSize: typeof fontSize === 'number' ? `${fontSize}vw` : fontSize, // placeholder sizing
          fontWeight: fontWeight,
          fontFamily: fontFamily,
          lineHeight: 0.9,
          letterSpacing: '-0.05em',
          textAlign: textAnchor === 'start' ? 'left' : textAnchor === 'end' ? 'right' : 'center'
      }}>
        {content}
      </div>
    </Component>
  )
}
