import { ImageUpIcon, XIcon } from 'lucide-react'
import { useRef, useState } from 'react'

import { PrductThumbnail } from '@/types/vendor-product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import InputError from './ui/input-error'

interface IProps {
  image: PrductThumbnail
  onChange: (image: PrductThumbnail) => void
}

export default function ImageUploader(props: IProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [error, setError] = useState('')

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    const formData = new FormData()
    formData.append('file', file)

    const tokenEl = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null
    const csrfToken = tokenEl?.content

    try {
      const res = await fetch(route('upload.product-thumbnail'), {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': csrfToken ?? '',
        },
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Failed to upload image')
        throw new Error(data.message || 'Failed to upload image')
      }

      props.onChange({ secure_url: data.secure_url, public_id: data.public_id })
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    setPreview(undefined)
    setError('')
    props.onChange({ secure_url: '', public_id: '' })

    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <>
      <div
        className="relative flex h-60 cursor-pointer items-center justify-center rounded-md border border-dashed"
        onClick={() => inputRef.current?.click()}
      >
        {props.image.secure_url || preview ? (
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
      <InputError message={error} />
    </>
  )
}
