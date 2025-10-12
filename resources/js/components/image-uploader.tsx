import { ImageUpIcon, LoaderIcon, XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import { PrductThumbnail } from '@/types/vendor-product'
import InputError from '@/components/ui/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface IProps {
  id?: string
  image: PrductThumbnail
  onChange: (image: PrductThumbnail) => void
}

export default function ImageUploader(props: IProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] = useState<string>('')

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      setError('')
      setProgress(0)

      const res = await axios.post(route('upload.product-image'), formData, {
        headers: {
          'X-File-Path': props.id ? `Xtore/products/${props.id}/thumbnail` : 'Xtore/temp',
        },

        onUploadProgress: (event) => {
          if (event.total) {
            const percentCompleted = Math.round((event.loaded * 100) / event.total) - 1
            setProgress(percentCompleted)
          }
        },
      })

      props.onChange({ secure_url: res.data.secure_url, public_id: res.data.public_id })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setProgress(0)
      console.error('Error uploading image:', error)
      props.onChange({ secure_url: '', public_id: '' })

      if (error.response?.status === 422 || error.response?.status === 413) {
        setError(error.response.data.message)
      } else {
        setError('Failed to upload image')
      }
    }
  }

  function handleFileCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    setError('')
    props.onChange({ secure_url: '', public_id: '' })
    if (inputRef.current) inputRef.current.value = ''
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(0)
    }, 500)

    return () => clearTimeout(timer)
  }, [props.image.secure_url])

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
        {props.image.secure_url ? (
          <>
            <img className="size-full object-contain" src={props.image.secure_url} alt="image" />
            <Button type="button" className="absolute top-4 right-4 rounded-sm" onClick={handleFileCancel}>
              <XIcon />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <p className="mb-2 flex items-center gap-2">
              <ImageUpIcon /> Select an image.
            </p>
            <p className="mb-2 flex items-center gap-2 text-sm text-red-300">
              *Image size must not be greater than 512 KB
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

        {progress > 0 && progress < 100 && (
          <div className="absolute z-100 h-full w-full bg-gray-100/40 backdrop-blur-xl">
            <div className="absolute top-1/2 left-1/2 flex w-fit -translate-1/2 items-center justify-center gap-4 rounded bg-white/90 px-2 py-2 text-primary">
              <LoaderIcon className="animate-spin" />
              <p>{progress} %</p>
            </div>
          </div>
        )}
      </div>
      <InputError message={error} />
    </>
  )
}
