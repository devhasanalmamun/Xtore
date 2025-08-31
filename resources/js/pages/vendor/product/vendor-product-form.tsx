import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IVendorProduct, prodectStatus } from '@/types/vendor-product'
import { IAdminDepartment } from '@/types/admin-department'
import { IAdminCategory } from '@/types/admin-category'
import Textarea from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'

type PartialCategory = Pick<IAdminCategory, 'id' | 'department_id' | 'name'>

interface IProps {
  status: prodectStatus[]
  departments: Pick<IAdminDepartment, 'id' | 'name'>[]
  categories: PartialCategory[]
  data: IVendorProduct
  onDataChange: (data: IVendorProduct) => void
  errors: Record<string, string>
}

export default function VendorProductForm(props: IProps) {
  const [relatedCategories, setRelatedCategories] = useState<PartialCategory[]>([])

  function handleChange(key: keyof IVendorProduct, value: string | number) {
    props.onDataChange({
      ...props.data,
      [key]: value,
    })
  }

  useEffect(() => {
    if (!props.data.derpartment_id) return

    const newRelatedCategories = props.categories.filter(
      (category) => category.department_id === props.data.derpartment_id,
    )
    setRelatedCategories(newRelatedCategories)
  }, [props.data.derpartment_id, props.categories])

  return (
    <form id="vendor-product-form" className="max-w-xl space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={props.data.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter the product title"
        />
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          value={props.data.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
          placeholder="Enter the product slug"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={props.data.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter the product description"
          rows={5}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            value={props.data.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={props.data.price}
            onChange={(e) => handleChange('price', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="department">Department</Label>
          <Select
            name="department"
            value={props.data.derpartment_id !== undefined ? String(props.data.derpartment_id) : ''}
            onValueChange={(e) => handleChange('derpartment_id', parseInt(e, 10))}
          >
            <SelectTrigger id="department">
              <SelectValue placeholder="Select a department for product" />
            </SelectTrigger>

            <SelectContent>
              {props.departments.map((department) => (
                <SelectItem key={department.id} value={String(department.id)}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {props.data.derpartment_id && (
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              value={props.data.category_id !== undefined ? String(props.data.category_id) : ''}
              onValueChange={(e) => handleChange('category_id', parseInt(e, 10))}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category for product" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{!(relatedCategories.length > 0) && <p>No category found</p>}</SelectLabel>
                  {relatedCategories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="meta_title">Meta Title</Label>
        <Input
          id="meta_title"
          name="meta_title"
          value={props.data.meta_title}
          onChange={(e) => handleChange('meta_title', e.target.value)}
          placeholder="Enter the product meta title for SEO"
        />
      </div>

      <div>
        <Label htmlFor="meta_description">Meta Description</Label>
        <Textarea
          id="meta_description"
          name="meta_description"
          rows={5}
          value={props.data.meta_description}
          onChange={(e) => handleChange('meta_description', e.target.value)}
          placeholder="Enter the product meta description for SEO"
        />
      </div>

      <div>
        <Label htmlFor="status">Select Status</Label>
        <Select name="status" value={props.data.status} onValueChange={(e) => handleChange('status', e)}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
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
