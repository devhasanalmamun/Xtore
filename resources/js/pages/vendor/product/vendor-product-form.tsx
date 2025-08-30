import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IAdminDepartment } from '@/types/admin-department'
import { IAdminCategory } from '@/types/admin-category'
import { prodectStatus } from '@/types/vendor-product'
import Textarea from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type PartialCategory = Pick<IAdminCategory, 'id' | 'department_id' | 'name'>

interface IProps {
  status: prodectStatus[]
  departments: Pick<IAdminDepartment, 'id' | 'name'>[]
  categories: PartialCategory[]
}

export default function VendorProductForm(props: IProps) {
  return (
    <form id="vendor-product-form" className="max-w-xl space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="Enter the product title" />
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" placeholder="Enter the product slug" />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="slug" name="slug" placeholder="Enter the product description" rows={5} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input type="number" id="quantity" name="quantity" defaultValue={1} />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input type="number" id="price" name="price" defaultValue={100} />
        </div>
      </div>

      {/* Department && Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="department">Department</Label>
          <Select name="department">
            <SelectTrigger id="department">
              <SelectValue placeholder="Select a department for product" />
            </SelectTrigger>

            <SelectContent>
              {props.departments.map((department) => (
                <SelectItem key={department.id} value={department.id}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select name="category">
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category for product" />
            </SelectTrigger>

            <SelectContent>
              {props.categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="meta_title">Meta Title</Label>
        <Input id="meta_title" name="meta_title" placeholder="Enter the product meta title for SEO" />
      </div>

      <div>
        <Label htmlFor="meta_description">Meta Description</Label>
        <Textarea
          id="meta_description"
          name="meta_description"
          placeholder="Enter the product meta description for SEO"
          rows={5}
        />
      </div>

      <div>
        <Label htmlFor="status">Select Status</Label>

        <Select name="status">
          <SelectTrigger id="status">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectValue />

          <SelectContent>
            {props.status.map((status) => (
              <SelectItem key={status.label} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  )
}
