import VendorProductStatusEnum from '@/enums/vendor-product-status-enums'

export interface IVendorProduct {
  id?: number
  department_id?: number
  category_id?: number
  created_by?: number
  title: string
  slug: string
  description: string
  price: number
  quantity: number
  status: VendorProductStatusEnum
  thumbnail_url: string
  meta_title: string
  meta_description: string
}

export type productStatus = {
  label: string
  value: string
}
