import { ImageUpIcon, XIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import axios from 'axios'

import { PrductThumbnail } from '@/types/vendor-product'
import InputError from '@/components/ui/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface IProps {
  image: PrductThumbnail
  onChange: (image: PrductThumbnail) => void
}

export default function ImageUploader(props: IProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string>('')

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
      // Will have a upload progress indicator later
      setError('')

      const res = await axios.post(route('upload.product-thumbnail'), formData, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': csrfToken ?? '',
        },
      })

      props.onChange({ secure_url: res.data.secure_url, public_id: res.data.public_id })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      props.onChange({ secure_url: '', public_id: '' })

      if (error.response?.status === 422 || error.response?.status === 413) {
        setError(error.response.data.message)
      } else {
        setError('Failed to upload image')
      }

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
