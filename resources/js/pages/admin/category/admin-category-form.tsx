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
import { Checkbox } from '@/components/ui/checkbox'
import Textarea from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface IProps {
  departments: Pick<IAdminDepartment, 'name' | 'slug'>[]
  categories: Pick<IAdminCategory, 'name' | 'slug' | 'parent_id'>[]
  data: IAdminCategory & { department_slug: string; parent_category_slug: string }
  onDataChange: (data: IAdminCategory & { department_slug: string; parent_category_slug: string }) => void
  errors: Record<string, string>
}

export default function AdminCategoryForm(props: IProps) {
  function handleChange(key: string, value: string | boolean) {
    props.onDataChange({
      ...props.data,
      [key]: value === 'null' ? null : value,
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
      </div>

      <div>
        <Label htmlFor="department">Choose Department</Label>
        <Select name="department" onValueChange={(value) => handleChange('department_slug', value)}>
          <SelectTrigger id="department">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                {props.departments.length ? <p>Select a department</p> : <p>No department found</p>}
              </SelectLabel>
              {props.departments.map((department) => (
                <SelectItem key={department.slug} value={department.slug}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="category">Choose Category</Label>
        <Select name="category" onValueChange={(value) => handleChange('parent_category_slug', value)}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{props.categories.length ? <p>Select a category</p> : <p>No category found</p>}</SelectLabel>
              <SelectItem value="null">Root Category</SelectItem>
              {props.categories.map((category) => (
                <SelectItem key={category.slug} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Checkbox
          id="active"
          name="active"
          defaultChecked={props.data.active}
          onCheckedChange={(e) => handleChange('active', e)}
        />
        <Label htmlFor="active" className="mb-0 font-normal">
          Uncheck this, if you want this category to be inactive.
        </Label>
      </div>
    </form>
  )
}
