import { useRef } from 'react'

import { Input } from '@/components/ui/input'

export default function MultiImageUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  return (
    <div
      className="relative flex h-48 cursor-pointer items-center rounded-md border border-dashed px-8"
      onClick={() => inputRef.current?.click()}
    >
      <div className="flex items-center justify-center">
        <div className="h-38 w-33 border">Browse</div>
      </div>

      <Input ref={inputRef} type="file" id="thumbnail" accept="image/*" className="hidden" />
    </div>
  )
}
