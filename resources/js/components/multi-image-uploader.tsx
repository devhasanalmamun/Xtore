import { useEffect, useRef, useState } from 'react'
import { PlusCircleIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

export default function MultiImageUploader() {
  const [images, setImages] = useState<(File | string)[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const imageRef = useRef<HTMLInputElement | null>(null)

  console.log(images)
  console.log(previews)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const files = Array.from(e.target.files)

    if (files.length >= 5) {
      console.log("You can't add more than 5 image")
      return
    }

    setImages((prev) => [...prev, ...files])
  }

  useEffect(() => {
    if (images.length === 0) return

    const fileImages = images.filter((img): img is File => img instanceof File)
    const stringImages = images.filter((img): img is string => typeof img === 'string')

    const fileUrls = fileImages.map((file) => URL.createObjectURL(file))
    setPreviews([...stringImages, ...fileUrls])

    return () => fileUrls.forEach((url) => URL.revokeObjectURL(url))
  }, [images])

  return (
    <div className="flex items-center gap-4 rounded-md border border-dashed px-8 py-5">
      <div className="flex gap-2 overflow-x-auto">
        {previews.map((src, i) => (
          <div key={i} className="h-38 w-33 shrink-0">
            <img src={src} alt={`preview-${i}`} className="h-full w-full rounded object-cover" />
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
