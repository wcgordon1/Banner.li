'use client'

import { useState, useCallback, useEffect } from 'react'
import ReactEasyCrop from 'react-easy-crop'
import Image from 'next/image'

export function CircularImageFrame({ image }) {
  // State variables for crop, zoom, and image readiness
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(0.1)
  const [imageReady, setImageReady] = useState(false)

  console.log('Initial render - image prop:', image) // Log the initial image prop

  // Callback for when crop is completed
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log('Crop completed:', croppedAreaPixels)
  }, [])

  // Handler for zoom changes
  const handleZoomChange = (e) => {
    const newZoom = parseFloat(e.target.value)
    console.log('Zoom changed:', newZoom)
    setZoom(newZoom)
  }

  // Effect to load and prepare the image
  useEffect(() => {
    console.log('useEffect triggered - image:', image)
    
    const img = document.createElement('img')
    
    img.onload = () => {
      console.log('Image loaded - dimensions:', img.width, 'x', img.height)
      
      const aspectRatio = img.width / img.height
      const minZoomX = 400 / img.width
      const minZoomY = 400 / img.height
      const newMinZoom = Math.max(minZoomX, minZoomY)
      const newZoom = Math.max(minZoomX, minZoomY, 1)
      
      console.log('Calculated zoom values - minZoom:', newMinZoom, 'initialZoom:', newZoom)
      
      setMinZoom(newMinZoom)
      setZoom(newZoom)
      setImageReady(true)
      
      console.log('Image ready state set to true')
    }
    
    img.onerror = (error) => {
      console.error('Error loading image:', error)
    }
    
    img.src = image
    console.log('Image src set:', image)
  }, [image])

  console.log('Render - imageReady:', imageReady) // Log the imageReady state before render

  return (
    <div className="w-full">
      {/* Zoom controls */}
      <div className="mb-4 flex items-center">
        <button 
          onClick={() => setZoom(Math.max(minZoom, zoom - 0.1))}
          className="px-2 py-1 bg-[#0B65C2] text-white rounded"
        >
          -
        </button>
        <input
          type="range"
          value={zoom}
          min={minZoom}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={handleZoomChange}
          className="w-full mx-2"
        />
        <button 
          onClick={() => setZoom(Math.min(3, zoom + 0.1))}
          className="px-2 py-1 bg-[#0B65C2] text-white rounded"
        >
          +
        </button>
        <span className="ml-2">{zoom.toFixed(2)}x</span>
      </div>
      
      {/* Image display area */}
      <div className="relative aspect-square bg-[#f3f4f6]">
        {imageReady ? (
          // Render ReactEasyCrop when image is ready
          <ReactEasyCrop
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="round"
            showGrid={false}
            minZoom={minZoom}
            cropSize={{ width: 400, height: 400 }}
            style={{ 
              containerStyle: { 
                width: '100%', 
                height: '100%',
              },
              cropAreaStyle: { 
                border: '1px solid #ffffff'
              } 
            }}
            objectFit="contain"
          />
        ) : (
          // Render Next.js Image component when image is not ready
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src={image}
              alt="Initial image"
              width={400}
              height={400}
              className="rounded-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  )
}