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

export default function AdminDepartmentDelete(props: IProps) {
  const { delete: destroy, processing } = useForm()
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  function handleDelete(slug: string) {
    destroy(route('admin.departments.destroy', slug), {
      onSuccess: () => {
        setIsAlertDialogOpen(false)
        console.log('Department Deleted Successfully')
      },
      onError: () => {
        console.error('failed to delete the department')
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
          <AlertDialogTitle>Do you want to delete this department permanently?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the department and all associated categories.
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
