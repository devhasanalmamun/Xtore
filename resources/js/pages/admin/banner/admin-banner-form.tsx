import React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ImageUploader from '@/components/image-uploader'
import InputError from '@/components/ui/input-error'
import { Checkbox } from '@/components/ui/checkbox'
import { IAdminBanner } from '@/types/admin-banner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface IEnumLabel {
  label: string
  value: string
}

interface IProps {
  pages: IEnumLabel[]
  sections: IEnumLabel[]
  data: IAdminBanner
  onDataChange: (data: IAdminBanner) => void
  errors: Record<string, string>
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function AdminBannerForm(props: IProps) {
  function handleChange(key: string, value: string | number | boolean | undefined) {
    props.onDataChange({
      ...props.data,
      [key]: value,
    })
  }

  return (
    <form id="admin-banner-form" className="max-w-3xl space-y-4" onSubmit={props.handleSubmit}>
      <div>
        <Label htmlFor="image">Banner Image</Label>
        <ImageUploader destination="/banners" image={props.data.image} onChange={(url) => handleChange('image', url)} />
        <InputError message={props.errors.image} />
      </div>

      <div>
        <Label htmlFor="title">Banner Title</Label>
        <Input
          id="title"
          name="title"
          value={props.data.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter banner title. ex: Mega super offer"
          required
        />
        <InputError message={props.errors.title} />
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          value={props.data.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
          placeholder="Enter the slug for banner. ex: Mega-super-offer"
          required
        />
        <InputError message={props.errors.slug} />
      </div>

      <div className="mb-6 flex justify-between gap-4">
        <div>
          <Label htmlFor="page">Choose page</Label>
          <Select value={props.data.page} name="page" onValueChange={(value) => handleChange('page', value)}>
            <SelectTrigger id="page" className="min-w-80">
              <SelectValue placeholder="Select a page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{props.pages.length ? <p>Select a page</p> : <p>No page found</p>}</SelectLabel>
                {props.pages.map((page, i) => (
                  <SelectItem key={i} value={page.value}>
                    {page.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <InputError message={props.errors.page} />
        </div>

        <div>
          <Label htmlFor="section">Choose section</Label>
          <Select value={props.data.section} name="section" onValueChange={(value) => handleChange('section', value)}>
            <SelectTrigger id="section" className="min-w-80">
              <SelectValue placeholder="Select a section" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{props.sections.length ? <p>Select a section</p> : <p>No section found</p>}</SelectLabel>
                {props.sections.map((section, i) => (
                  <SelectItem key={i} value={section.value}>
                    {section.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <InputError message={props.errors.section} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Checkbox
          id="active"
          name="active"
          defaultChecked={props.data.active}
          onCheckedChange={(e) => handleChange('active', e)}
        />
        <Label htmlFor="active" className="mb-0 font-normal">
          Uncheck this, if you want this banner to be inactive.
        </Label>
      </div>
    </form>
  )
}
