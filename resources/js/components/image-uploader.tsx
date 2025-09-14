import { useEffect, useRef, useState } from 'react'
import { ImageUpIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface IProps {
  image: string | File
  onChange: (file: File | string) => void
}

export default function ImageUploader(props: IProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | undefined>(undefined)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      props.onChange(file)
    }
  }

  function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    setPreview(undefined)
    props.onChange('')
  }

  useEffect(() => {
    if (props.image && typeof props.image !== 'string') {
      const objectUrl = URL.createObjectURL(props.image)
      setPreview(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
    }

    setPreview(undefined)
  }, [props.image])

  return (
    <div
      className="relative flex h-60 cursor-pointer items-center justify-center rounded-md border border-dashed"
      onClick={() => inputRef.current?.click()}
    >
      {props.image ? (
        <>
          <img
            className="size-full object-cover"
            src={preview ?? (typeof props.image === 'string' ? props.image : undefined)}
            alt="image"
          />
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
