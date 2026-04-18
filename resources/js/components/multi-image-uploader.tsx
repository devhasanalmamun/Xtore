import { LoaderIcon, PlusCircleIcon, XIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import InputError from '@/components/ui/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface IProps {
  id?: string
  destination: string
  images: string[]
  onChange: (images: string[]) => void
}

export default function MultiImageUploader(props: IProps) {
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const files = Array.from(e.target.files)

    if (props.images.length + files.length > 5) {
      setError("You can't add more than 5 image")
      return
    }
    setError('')

    let totalLoaded = 0
    const totalSize = files.reduce((acc, f) => acc + f.size, 0)

    const controllers: AbortController[] = []

    try {
      const uploadPromises = files.map((file) => {
        const controller = new AbortController()
        controllers.push(controller)

        const formData = new FormData()
        formData.append('file', file)

        return axios.post(route('upload.product-image'), formData, {
          signal: controller.signal,
          headers: {
            'X-File-Path': props.destination,
          },
          onUploadProgress: (event) => {
            if (event.total) {
              totalLoaded += event.loaded
              const percentCompleted = Math.min(99, Math.round((totalLoaded * 100) / totalSize))
              setProgress(percentCompleted)
            }
          },
        })
      })

      const results = await Promise.all(uploadPromises)
      const uploadedImages = results.map((res) => res.data)

      props.onChange([...props.images, ...uploadedImages])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      controllers.forEach((controller) => controller.abort())
      setProgress(0)

      if (error.response?.status === 422 || error.response?.status === 413) {
        setError(error.response.data.message)
      } else {
        setError('Failed to upload images. Please try again.')
      }

      console.error(error)
    }
  }

  async function handleFileCancel(index: number) {
    const updatedImages = props.images.filter((_, i) => i !== index)
    props.onChange(updatedImages)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(0)
    }, 50)

    return () => clearTimeout(timer)
  }, [props.images.length])

  return (
    <>
      <div
        className={cn(
          'relative flex items-center gap-4 rounded-md border border-dashed px-8 py-5',
          progress > 0 && progress < 100 && 'pointer-events-none opacity-50',
        )}
      >
        <div className="flex gap-2 overflow-x-auto">
          {props.images.map((image, index) => (
            <div key={index} className="relative h-38 w-33 shrink-0 overflow-hidden rounded border">
              <img src={image} alt={`preview-${index}`} className="h-full w-full object-cover" />
              <Button
                type="button"
                size="sm"
                className="absolute top-0.5 right-0.5 h-6.5 rounded-sm has-[>svg]:px-1"
                onClick={() => handleFileCancel(index)}
              >
                <XIcon />
              </Button>
            </div>
          ))}

          {!(props.images.length >= 5) && (
            <div
              className="flex h-38 w-33 shrink-0 cursor-pointer flex-col items-center justify-center space-y-1 rounded border p-1"
              onClick={() => imageRef.current?.click()}
            >
              <p>Browse</p>
              <PlusCircleIcon className="text-gray-800" strokeWidth={1} />
            </div>
          )}
        </div>

        <Input
          className="hidden"
          ref={imageRef}
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        {progress > 0 && progress < 100 && (
          <div className="absolute top-4 right-10 flex gap-2">
            <LoaderIcon className="animate-spin" />
            <p>{progress} %</p>
          </div>
        )}
      </div>
      <InputError message={error} />
    </>
  )
}
