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

export default function VendorProductDelete(props: IProps) {
  const { delete: destroy, processing } = useForm()
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  function handleDelete(slug: string) {
    destroy(route('vendor.products.destroy', slug), {
      onSuccess: () => {
        setIsAlertDialogOpen(false)
        console.log('Product Deleted Successfully')
      },
      onError: () => {
        console.error('Failed to delete the product')
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
          <AlertDialogTitle>Do you want to delete this product permanently?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the product.
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
