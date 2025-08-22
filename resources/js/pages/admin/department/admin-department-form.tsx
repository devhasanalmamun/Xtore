import { IAdminDepartment } from '@/types/admin-department'
import InputError from '@/components/ui/input-error'
import { Checkbox } from '@/components/ui/checkbox'
import Textarea from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface IProps {
  data: IAdminDepartment
  onDataChange: (data: IAdminDepartment) => void
  errors: Record<string, string>
}

export default function AdminDepartmentForm(props: IProps) {
  function handleChange(key: string, value: string | boolean) {
    props.onDataChange({
      ...props.data,
      [key]: value,
    })
  }

  return (
    <form className="max-w-xl space-y-2">
      <div>
        <Label htmlFor="name">Department Name</Label>
        <Input
          id="name"
          name="name"
          value={props.data.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter a depertment name ex: Electronics"
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
          placeholder="Enter slug ex: Electronics"
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

      <div className="mt-4 flex items-center gap-2">
        <Checkbox
          id="active"
          name="active"
          defaultChecked={props.data.active}
          onCheckedChange={(e) => handleChange('active', e)}
        />
        <Label htmlFor="active" className="mb-0 font-normal">
          Uncheck this if you want this department to be inactive
        </Label>
        <InputError message={props.errors.active} />
      </div>
    </form>
  )
}
