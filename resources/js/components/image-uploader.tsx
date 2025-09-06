import { ImageUpIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Input } from '@/components/ui/input'

interface IProps {
  image: string
  onChange: (file: File) => void
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
      className="flex h-100 cursor-pointer items-center justify-center rounded-md border border-dashed"
      onClick={() => inputRef.current?.click()}
    >
      {props.image ? (
        <img className="size-full object-cover" src={preview} alt="image" />
      ) : (
        <div className="text-center">
          <p className="mb-2 flex items-center gap-2">
            <ImageUpIcon /> Drag and drop an image here
          </p>
          <p className="text-sm text-gray-400">or click to select file</p>
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
