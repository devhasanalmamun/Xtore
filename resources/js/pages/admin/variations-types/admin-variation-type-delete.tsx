import { useForm } from '@inertiajs/react'
import { TrashIcon } from 'lucide-react'

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
import { useState } from 'react'

interface IProps {
  slug: string
}

export default function AdminVariationTypeDelete(props: IProps) {
  const { delete: destroy, processing } = useForm()
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  function handleDelete(slug: string) {
    destroy(route('admin.variation-types.destroy', slug), {
      onSuccess: () => {
        setIsAlertDialogOpen(false)
        console.log('Variation Type Deleted Successfully')
      },
      onError: () => {
        console.error('failed to delete the Variation Type')
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
          <AlertDialogTitle>Do you want to delete this variation type for products?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the variation type for all products and all
            associated options.
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
