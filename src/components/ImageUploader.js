'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import posthog from 'posthog-js'

export function ImageUploader({ onImageUpload }) {
  const [error, setError] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    setError(null)
    const file = acceptedFiles[0]
    
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      onImageUpload(e.target.result)
      posthog.capture('image_uploaded', { success: true })
    }
    reader.onerror = () => {
      setError('Error reading file')
      posthog.capture('image_uploaded', { success: false, error: 'read_error' })
    }
    reader.readAsDataURL(file)
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    maxFiles: 1
  })

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-[#0B65C2] bg-[#0B65C2]/10' : 'border-gray-300 hover:border-[#0B65C2]'}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>Drag and drop an image here, or click to select a file</p>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}