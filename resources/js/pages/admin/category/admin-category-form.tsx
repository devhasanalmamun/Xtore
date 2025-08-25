import { XIcon } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IAdminDepartment } from '@/types/admin-department'
import { IAdminCategory } from '@/types/admin-category'
import InputError from '@/components/ui/input-error'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import Textarea from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface IProps {
  departments: Pick<IAdminDepartment, 'id' | 'name'>[]
  categories: Pick<IAdminCategory, 'id' | 'name'>[]
  data: IAdminCategory
  onDataChange: (data: IAdminCategory) => void
  errors: Record<string, string>
}

export default function AdminCategoryForm(props: IProps) {
  function handleChange(key: string, value: string | number | boolean | undefined) {
    props.onDataChange({
      ...props.data,
      [key]: value,
    })
  }

  return (
    <form className="max-w-xl space-y-2">
      <div>
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          name="name"
          value={props.data.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter the category name. ex: Hard disk"
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
          placeholder="Enter the slug for category. ex: hard-disk"
          required
        />
        <InputError message={props.errors.slug} />
      </div>

      <div>
        <Label htmlFor="meta_title">Meta Title</Label>
        <Input
          id="meta_title"
          name="meta_title"
          value={props.data.meta_title}
          onChange={(e) => handleChange('meta_title', e.target.value)}
          placeholder="Enter Meta title for SEO"
          required
        />
        <InputError message={props.errors.meta_title} />
      </div>

      <div>
        <Label htmlFor="meta_description">Meta Description</Label>
        <Textarea
          id="meta_description"
          name="meta_description"
          value={props.data.meta_description}
          onChange={(e) => handleChange('meta_description', e.target.value)}
          rows={5}
          placeholder="Enter Meta description for SEO"
          required
        />
        <InputError message={props.errors.meta_description} />
      </div>

      <div>
        <Label htmlFor="department">Choose Department</Label>
        <Select name="department" onValueChange={(value) => handleChange('department_id', parseInt(value, 10))}>
          <SelectTrigger id="department">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                {props.departments.length ? <p>Select a department</p> : <p>No department found</p>}
              </SelectLabel>
              {props.departments.map((department, i) => (
                <SelectItem key={i} value={String(department.id)}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <InputError message={props.errors.department_id} />
      </div>

      <div>
        <Label htmlFor="category">Choose Parent Category</Label>
        <div className="relative">
          <Select
            name="category"
            value={props.data.parent_id !== undefined ? String(props.data.parent_id) : ''}
            onValueChange={(value) => handleChange('parent_id', parseInt(value, 10))}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  {props.categories.length ? <p>Select a category</p> : <p>No category found</p>}
                </SelectLabel>
                {props.categories.map((category, i) => {
                  return (
                    <SelectItem key={i} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="absolute top-0 right-10 flex items-center gap-1">
            <Button type="button" variant="ghost" size="icon" onClick={() => handleChange('parent_id', undefined)}>
              <XIcon className="text-gray-600" />
            </Button>
            <span className="inline-block h-5 w-0.5 bg-gray-300"></span>
          </div>
        </div>
        <InputError message={props.errors.parent_id} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Checkbox
          id="active"
          name="active"
          defaultChecked={props.data.active}
          onCheckedChange={(e) => handleChange('active', e)}
          required
        />
        <Label htmlFor="active" className="mb-0 font-normal">
          Uncheck this, if you want this category to be inactive.
        </Label>
      </div>
    </form>
  )
}
