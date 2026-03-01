import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IAdminSupportTicketCategory } from '@/types/admin-support-ticket'
import InputError from '@/components/ui/input-error'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface IProps {
  visibility_options: string[]
  data: IAdminSupportTicketCategory
  onDataChange: (data: IAdminSupportTicketCategory) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  errors: Record<string, string>
}

export default function SupportTicketCategoryForm(props: IProps) {
  function handleChange(key: string, value: string | number | boolean) {
    props.onDataChange({
      ...props.data,
      [key]: value,
    })
  }

  return (
    <form id="support-ticket-category-form" className="max-w-3xl space-y-4" onSubmit={props.onSubmit}>
      <div>
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          name="name"
          value={props.data.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter support ticket name"
          required
        />
        {props.errors.name && <InputError message={props.errors.name} />}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="basis-1/2">
          <Label htmlFor="name">Category Visibility</Label>
          <Select value={props.data.visibility} onValueChange={(value) => handleChange('visibility', value)}>
            <SelectTrigger className="capitalize">
              <SelectValue placeholder="Select Visibility" />
            </SelectTrigger>
            <SelectContent>
              {props.visibility_options.map((item) => (
                <SelectItem key={item} value={item} className="capitalize">
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {props.errors.visibility && <InputError message={props.errors.visibility} />}
        </div>
        <div className="basis-1/2">
          <Label htmlFor="name">Category Order</Label>
          <Input
            type="number"
            id="sort_order"
            name="sort_order"
            value={props.data.sort_order}
            onChange={(e) => handleChange('sort_order', Number(e.target.value))}
            required
          />
          {props.errors.sort_order && <InputError message={props.errors.sort_order} />}
        </div>
      </div>

      <div className="flex cursor-pointer items-center gap-2">
        <Checkbox
          id="active"
          name="active"
          defaultChecked={props.data.active}
          onCheckedChange={(checked) => handleChange('active', checked)}
        />
        <Label htmlFor="active" className="mb-0 cursor-pointer">
          Click to make this category active or inactive
        </Label>
        {props.errors.active && <InputError message={props.errors.active} />}
      </div>
    </form>
  )
}
