import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IVendorSupportTicketCreate } from '@/types/vendor-support-ticket'
import { IAdminSupportTicketCategory } from '@/types/admin-support-ticket'
import InputError from '@/components/ui/input-error'
import Textarea from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface IProps {
  data: IVendorSupportTicketCreate
  categories: IAdminSupportTicketCategory[]
  setData: (key: keyof IVendorSupportTicketCreate, value: string | number | undefined | string[]) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  errors: Record<string, string>
}

export default function VendorSupportTicketForm(props: IProps) {
  return (
    <form id="vendor-support-ticket-create-form" className="max-w-4xl space-y-4" onSubmit={props.handleSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            placeholder="Enter subject"
            value={props.data.subject}
            onChange={(e) => props.setData('subject', e.target.value)}
          />
          {props.errors.subject && <InputError>{props.errors.subject}</InputError>}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select name="category" onValueChange={(value) => props.setData('category', parseInt(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {props.categories.map((category) => (
                <SelectItem key={category.id ?? ''} value={category.id?.toString() ?? ''}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {props.errors.category && <InputError>{props.errors.category}</InputError>}
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={6}
          value={props.data.description}
          onChange={(e) => props.setData('description', e.target.value)}
          placeholder="Describe your issue in detail"
        />
        {props.errors.description && <InputError>{props.errors.description}</InputError>}
      </div>

      <div>
        <Label htmlFor="attachment">Attachment</Label>
        <Input id="attachment" name="attachment" type="file" />
        {props.errors.attachment && <InputError>{props.errors.attachment}</InputError>}
      </div>
    </form>
  )
}
