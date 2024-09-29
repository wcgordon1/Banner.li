'use client'

import { useState, useCallback } from 'react'
import ReactEasyCrop from 'react-easy-crop'

export function CircularImageFrame({ image }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log('Crop completed:', croppedAreaPixels)
  }, [])

  const handleZoomChange = (e) => {
    setZoom(parseFloat(e.target.value))
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center">
        <button 
          onClick={() => setZoom(Math.max(1, zoom - 0.1))}
          className="px-2 py-1 bg-[#0B65C2] text-white rounded"
        >
          -
        </button>
        <input
          type="range"
          value={zoom}
          min={1}
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
      
      <div className="relative aspect-square bg-[#f3f4f6]">
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
      </div>
    </div>
  )
}