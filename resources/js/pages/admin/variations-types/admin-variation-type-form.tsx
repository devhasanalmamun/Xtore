import React from 'react'

import { IAdminVariationType } from '@/types/admin-variation-type'
import InputError from '@/components/ui/input-error'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface IProps {
  data: IAdminVariationType
  onDataChange: (data: IAdminVariationType) => void
  errors: Record<string, string>
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function AdminVariationTypeForm(props: IProps) {
  function handleChange(key: string, value: string | boolean) {
    props.onDataChange({
      ...props.data,
      [key]: value,
    })
  }

  return (
    <form id="admin-department-form" className="max-w-xl space-y-4" onSubmit={props.handleSubmit}>
      <div>
        <Label htmlFor="name">Variation Type Name</Label>
        <Input
          id="name"
          name="name"
          value={props.data.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter a variation type name ex: Color"
          required
        />
        <InputError message={props.errors.name} />
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          value={props.data.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
          placeholder="Enter slug ex: color"
          required
        />
        <InputError message={props.errors.slug} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Checkbox
          id="active"
          name="active"
          defaultChecked={props.data.active}
          onCheckedChange={(e) => handleChange('active', e)}
        />
        <Label htmlFor="active" className="mb-0 font-normal">
          Uncheck this if you want this variation type to be inactive
        </Label>
        <InputError message={props.errors.active} />
      </div>
    </form>
  )
}
