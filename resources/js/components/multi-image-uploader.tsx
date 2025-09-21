import { PlusCircleIcon, XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type PreviewItem = {
  url: string
  isObjectUrl: boolean
}

export default function MultiImageUploader() {
  const [images, setImages] = useState<(File | string)[]>([])
  const [previews, setPreviews] = useState<PreviewItem[]>([])
  const imageRef = useRef<HTMLInputElement | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const files = Array.from(e.target.files)

    if (files.length > 5) {
      console.log("You can't add more than 5 image")
      return
    }

    setImages((prev) => [...prev, ...files])
  }

  function handleFileCancel(index: number) {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
  }

  useEffect(() => {
    if (images.length === 0 && previews.length === 0) return

    const newPreviews: PreviewItem[] = images.map((img) => {
      if (img instanceof File) {
        return {
          url: URL.createObjectURL(img),
          isObjectUrl: true,
        }
      } else {
        return {
          url: img,
          isObjectUrl: false,
        }
      }
    })

    setPreviews(newPreviews)

    return () =>
      newPreviews.forEach((item) => {
        if (item.isObjectUrl) URL.revokeObjectURL(item.url)
      })
  }, [images, previews.length])

  return (
    <div className="flex items-center gap-4 rounded-md border border-dashed px-8 py-5">
      <div className="flex gap-2 overflow-x-auto">
        {previews.map((item, index) => (
          <div key={index} className="relative h-38 w-33 shrink-0 overflow-hidden rounded border">
            <img src={item.url} alt={`preview-${index}`} className="h-full w-full object-cover" />
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

        {!(previews.length >= 5) && (
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
        id="product_images"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
    </div>
  )
}
