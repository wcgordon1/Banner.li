'use client'

import { useState } from 'react'
import { ImageUploader } from '../components/ImageUploader'
import { CircularImageFrame } from '../components/CircularImageFrame'

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState('/images/mark.png')

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#0B65C2]">LinkedIn #OpenToWork Banner Creator</h1>
      <div className="space-y-8">
        <ImageUploader onImageUpload={handleImageUpload} />
        <CircularImageFrame image={uploadedImage} key={uploadedImage} />
      </div>
    </div>
  )
}
