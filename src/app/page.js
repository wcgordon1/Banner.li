'use client'

import { useState } from 'react'
import { ImageUploader } from '../components/ImageUploader'

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null)

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">LinkedIn #OpenToWork Banner Creator</h1>
      <ImageUploader onImageUpload={handleImageUpload} />
      {uploadedImage && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Uploaded Image:</h2>
          <img src={uploadedImage} alt="Uploaded" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  )
}
