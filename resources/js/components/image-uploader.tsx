import { ImageUpIcon, XIcon } from 'lucide-react'
import { useRef, useState } from 'react'

import { PrductThumbnail } from '@/types/vendor-product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface IProps {
  image: PrductThumbnail
  onChange: (image: PrductThumbnail) => void
}

export default function ImageUploader(props: IProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | undefined>(undefined)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'temp_preset')

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    )

    if (!res.ok) {
      console.error('Image Upload Failed')
    }

    const data = await res.json()
    props.onChange({ secure_url: data.secure_url, public_id: data.public_id })
  }

  function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    setPreview(undefined)
    props.onChange({ secure_url: '', public_id: '' })

    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div
      className="relative flex h-60 cursor-pointer items-center justify-center rounded-md border border-dashed"
      onClick={() => inputRef.current?.click()}
    >
      {props.image.secure_url ? (
        <>
          <img className="size-full object-cover" src={preview || props.image.secure_url} alt="image" />
          <Button type="button" className="absolute top-4 right-4 rounded-sm" onClick={handleCancel}>
            <XIcon />
          </Button>
        </>
      ) : (
        <div className="text-center">
          <p className="mb-2 flex items-center gap-2">
            <ImageUpIcon /> Select an image.
          </p>
        </div>
      )}

      <Input
        ref={inputRef}
        type="file"
        id="thumbnail"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
