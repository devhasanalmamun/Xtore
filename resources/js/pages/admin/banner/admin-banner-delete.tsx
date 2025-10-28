import { useForm } from '@inertiajs/react'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface IProps {
  slug: string
}

export default function AdminBannerDelete(props: IProps) {
  const { delete: destroy, processing } = useForm()
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  function handleDelete(slug: string) {
    destroy(route('admin.banners.destroy', slug), {
      onSuccess: () => {
        setIsAlertDialogOpen(false)
        console.log('Banner Deleted Successfully')
      },
      onError: () => {
        console.error('Failed to delete the banner')
      },
    })
  }

  return (
    <AlertDialog open={isAlertDialogOpen} onOpenChange={() => setIsAlertDialogOpen(!isAlertDialogOpen)}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete this banner permanently?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the banner.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button variant="destructive" onClick={() => handleDelete(props.slug)} disabled={processing}>
            Confirm Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
