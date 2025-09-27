import { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IVendorProduct, PrductThumbnail, productStatus } from '@/types/vendor-product'
import MultiImageUploader from '@/components/multi-image-uploader'
import { IAdminDepartment } from '@/types/admin-department'
import PlateEditor from '@/components/editor/plate-editor'
import { IAdminCategory } from '@/types/admin-category'
import ImageUploader from '@/components/image-uploader'
import InputError from '@/components/ui/input-error'
import Textarea from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type PartialCategory = Pick<IAdminCategory, 'id' | 'department_id' | 'name'>

interface IProps {
  status: productStatus[]
  departments: Pick<IAdminDepartment, 'id' | 'name'>[]
  categories: PartialCategory[]
  data: IVendorProduct
  onDataChange: (data: IVendorProduct) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  errors: Record<string, string>
}

export default function VendorProductForm(props: IProps) {
  const [relatedCategories, setRelatedCategories] = useState<PartialCategory[]>([])

  const imageError = Object.keys(props.errors).find((key) => key.startsWith('product_images.'))

  function handleChange(
    key: keyof IVendorProduct,
    value: PrductThumbnail | string | number | undefined | (string | File)[],
  ) {
    props.onDataChange({
      ...props.data,
      [key]: value,
    })
  }

  useEffect(() => {
    if (!props.data.department_id) return

    const newRelatedCategories = props.categories.filter(
      (category) => category.department_id === props.data.department_id,
    )
    setRelatedCategories(newRelatedCategories)
  }, [props.data.department_id, props.categories])

  return (
    <form id="vendor-product-form" className="max-w-4xl space-y-4" onSubmit={props.handleSubmit}>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={props.data.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter the product title"
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
          placeholder="Enter the product slug"
          required
        />
        <InputError message={props.errors.slug} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            value={props.data.quantity}
            onChange={(e) => handleChange('quantity', parseInt(e.target.value, 10))}
            required
          />
          <InputError message={props.errors.quantity} />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={props.data.price}
            onChange={(e) => handleChange('price', parseInt(e.target.value, 10))}
            required
          />
          <InputError message={props.errors.price} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="department">Department</Label>
          <Select
            name="department"
            value={props.data.department_id !== undefined ? String(props.data.department_id) : ''}
            onValueChange={(e) => {
              props.onDataChange({
                ...props.data,
                department_id: parseInt(e, 10),
                category_id: undefined,
              })
            }}
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
          <InputError message={props.errors.department_id} />
        </div>

        {props.data.department_id && (
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
            <InputError message={props.errors.category_id} />
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
          required
        />
        <InputError message={props.errors.meta_title} />
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
          required
        />
        <InputError message={props.errors.meta_description} />
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

      <div>
        <Label htmlFor="thumbnail">Product Thumbnail</Label>
        <ImageUploader image={props.data.thumbnail_image} onChange={(urls) => handleChange('thumbnail_image', urls)} />
      </div>

      <div>
        <Label htmlFor="product_images">Product Images (5 image max)</Label>
        <MultiImageUploader onChange={(images) => handleChange('product_images', images)} />
        <InputError message={imageError ? props.errors[imageError] : props.errors.product_images} />
      </div>

      <div>
        <Label>Product Description</Label>
        <PlateEditor value={props.data.description} onChange={(value) => handleChange('description', value)} />
        <InputError message={props.errors.description} />
      </div>
    </form>
  )
}
