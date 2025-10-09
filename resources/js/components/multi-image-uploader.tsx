import { LoaderIcon, PlusCircleIcon, XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import { ProductImage } from '@/types/vendor-product'
import InputError from '@/components/ui/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface IProps {
  id?: string
  product_images: ProductImage[]
  onChange: (images: ProductImage[]) => void
}

export default function MultiImageUploader(props: IProps) {
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const files = Array.from(e.target.files)

    if (props.product_images.length + files.length > 5) {
      setError("You can't add more than 5 image")
      return
    }
    setError('')

    let totalLoaded = 0
    const totalSize = files.reduce((acc, f) => acc + f.size, 0)

    try {
      const uploadPromises = files.map((file) => {
        const formData = new FormData()
        formData.append('file', file)

        return axios.post(route('upload.product-image'), formData, {
          headers: {
            'X-File-Path': `Xtore/products/${props.id}/images`,
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

      const uploadedImages = results.map((res) => ({
        secure_url: res.data.secure_url,
        public_id: res.data.public_id,
      }))

      props.onChange([...props.product_images, ...uploadedImages])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
      setProgress(0)

      if (error.response?.status === 422 || error.response?.status === 413) {
        setError(error.response.data.message)
      } else {
        setError('Failed to upload images. Please try again.')
      }
    }
  }

  async function handleFileCancel(index: number) {
    const updatedImages = props.product_images.filter((_, i) => i !== index)
    props.onChange(updatedImages)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(0)
    }, 50)

    return () => clearTimeout(timer)
  }, [props.product_images.length])

  return (
    <>
      <div
        className={cn(
          'relative flex items-center gap-4 rounded-md border border-dashed px-8 py-5',
          progress > 0 && progress < 100 && 'pointer-events-none opacity-50',
        )}
      >
        <div className="flex gap-2 overflow-x-auto">
          {props.product_images.map((image, index) => (
            <div key={index} className="relative h-38 w-33 shrink-0 overflow-hidden rounded border">
              <img src={image.secure_url} alt={`preview-${index}`} className="h-full w-full object-cover" />
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

          {!(props.product_images.length >= 5) && (
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
