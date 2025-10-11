import * as React from 'react'

import type { OurFileRouter } from '@/lib/uploadthing'
import type { ClientUploadedFileData, UploadFilesOptions } from 'uploadthing/types'

import { toast } from 'sonner'
import { z } from 'zod'
import axios from 'axios'

export type UploadedFile<T = unknown> = ClientUploadedFileData<T>

interface UseUploadFileProps
  extends Pick<
    UploadFilesOptions<OurFileRouter['editorUploader']>,
    'headers' | 'onUploadBegin' | 'onUploadProgress' | 'skipPolling'
  > {
  onUploadComplete?: (file: UploadedFile) => void
  onUploadError?: (error: unknown) => void
}

export function useUploadFile({ onUploadComplete, onUploadError, ...props }: UseUploadFileProps = {}) {
  const [uploadedFile, setUploadedFile] = React.useState<UploadedFile>()
  const [uploadingFile, setUploadingFile] = React.useState<File>()
  const [progress, setProgress] = React.useState<number>(0)
  const [isUploading, setIsUploading] = React.useState(false)

  //TODO: Have to fix this later so product description use images properly
  async function uploadThing(file: File) {
    setIsUploading(true)
    setUploadingFile(file)

    try {
      const res = await axios.post(
        route('editor-media.store'),
        { file },
        {
          headers: {
            'X-File-Path': `Xtore/products/placeholder-id/description`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      const data = res.data
      console.log(data)

      setUploadedFile(data)
      onUploadComplete?.(data)

      return uploadedFile
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      const message = errorMessage.length > 0 ? errorMessage : 'Something went wrong, please try again later.'
      toast.error(message)
      onUploadError?.(error)

      // Mock upload for unauthenticated users
      // toast.info('User not logged in. Mocking upload process.');
      const mockUploadedFile = {
        key: 'mock-key-0',
        appUrl: `https://mock-app-url.com/${file.name}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      } as UploadedFile

      // Simulate upload progress
      let progress = 0

      const simulateProgress = async () => {
        while (progress < 100) {
          await new Promise((resolve) => setTimeout(resolve, 50))
          progress += 2
          setProgress(Math.min(progress, 100))
        }
      }

      await simulateProgress()

      setUploadedFile(mockUploadedFile)

      return mockUploadedFile
    } finally {
      setProgress(0)
      setIsUploading(false)
      setUploadingFile(undefined)
    }
  }

  return {
    isUploading,
    progress,
    uploadedFile,
    uploadFile: uploadThing,
    uploadingFile,
  }
}

export function getErrorMessage(err: unknown) {
  const unknownError = 'Something went wrong, please try again later.'

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })

    return errors.join('\n')
  } else if (err instanceof Error) {
    return err.message
  } else {
    return unknownError
  }
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err)

  return toast.error(errorMessage)
}
