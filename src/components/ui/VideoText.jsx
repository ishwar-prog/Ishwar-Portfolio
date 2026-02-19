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
  fontWeight = "800",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
}) {
  const [svgMask, setSvgMask] = useState("")
  // Flatten children to a string if possible, or join them.
  const content = React.Children.toArray(children).join("")

  useEffect(() => {
    const updateSvgMask = () => {
      // Use window.innerWidth to make it consistent if you pass number
      const responsiveFontSize = 
        typeof fontSize === "number" ? `${fontSize}vw` : fontSize
      
      // The content is rendered inside an SVG text element.
      // We need to properly escape content for XML/SVG.
      // But we can simplify: just ensure quotes are not malformed?
      
      
      // Let's use a standard viewBox and adjust text size. 
      // y="50%" dominant-baseline="middle" centers vertically perfectly.
      // x="50%" text-anchor="middle" centers horizontally.
      // We want to maximize the text size without clipping.  
      
      const xPos = textAnchor === "start" ? "0%" : textAnchor === "end" ? "100%" : "50%"
      
      const newSvgMask = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <text x="${xPos}" y="75%" font-size="${responsiveFontSize}" font-weight="${fontWeight}" text-anchor="${textAnchor}" font-family="${fontFamily}" letter-spacing="-0.05em" fill="black">${content}</text>
      </svg>`

      // Creating data URI
      // We need to encode it properly.
      // encodeURIComponent encodes everything, including < > etc.
      // This is safe for data URI.
      
      setSvgMask(newSvgMask)
    }

    updateSvgMask()
    // Add resize listener only if font size is relative or layout changes?
    window.addEventListener("resize", updateSvgMask)
    return () => window.removeEventListener("resize", updateSvgMask)
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily])
  
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

      {/* SEO text, hidden visually but available for screen readers */}
      <span className="sr-only">{content}</span>
      
      {/* 
        This is a hack to make the container size match the text size roughly. 
        Because the SVG mask is absolute positioned, the container collapses to 0 height unless sized explicitly.
        Since we want the text to dictate the size, we can render invisible text.
        But the mask applies to the video container.
      */}
      <div aria-hidden="true" className="opacity-0 select-none pointer-events-none whitespace-nowrap" style={{ 
          fontSize: typeof fontSize === 'number' ? `${fontSize}vw` : fontSize,
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
