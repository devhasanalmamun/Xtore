import { ImageUpIcon, LoaderIcon, XIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import axios from 'axios'

import { PrductThumbnail } from '@/types/vendor-product'
import InputError from '@/components/ui/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface IProps {
  image: PrductThumbnail
  onChange: (image: PrductThumbnail) => void
}

export default function ImageUploader(props: IProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] = useState<string>('')

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setTimeout(() => {
      setPreview(URL.createObjectURL(file))
    }, 350)

    const formData = new FormData()
    formData.append('file', file)

    const tokenEl = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null
    const csrfToken = tokenEl?.content

    try {
      // Will have a upload progress indicator later
      setError('')
      setProgress(0)

      const res = await axios.post(route('upload.product-thumbnail'), formData, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': csrfToken ?? '',
        },

        onUploadProgress: (event) => {
          if (event.total) {
            const percentCompleted = Math.round((event.loaded * 100) / event.total)
            setProgress(percentCompleted)
          }
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
        onClick={() => {
          if (progress === 0 || progress === 100) {
            inputRef.current?.click()
          }
        }}
      >
        {props.image.secure_url || preview ? (
          <>
            <img className="size-full object-cover" src={preview || props.image.secure_url} alt="image" />

            {(progress === 0 || progress === 100) && (
              <Button type="button" className="absolute top-4 right-4 rounded-sm" onClick={handleCancel}>
                <XIcon />
              </Button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <p className="mb-2 flex items-center gap-2">
              <ImageUpIcon /> Select an image.
            </p>
            <p className="mb-2 flex items-center gap-2 text-sm text-red-300">
              *Image size must not be greater than 256 KB
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

        {preview && progress > 0 && progress < 100 && (
          <div className="absolute z-100 h-full w-full bg-gray-100/40 backdrop-blur-xl">
            <div className="absolute top-1/2 left-1/2 flex w-fit -translate-1/2 items-center justify-center gap-4 rounded bg-white/90 px-2 py-2 text-primary">
              <LoaderIcon className={cn('size-10', progress === 0 || progress === 0 ? 'block' : 'block')} />
              <p>{progress} %</p>
            </div>
          </div>
        )}
      </div>
      <InputError message={error} />
    </>
  )
}
