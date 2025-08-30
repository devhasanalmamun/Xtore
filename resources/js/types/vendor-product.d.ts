import VendorProductStatusEnum from '@/enums/vendor-product-status-enums'

export interface IVendorProduct {
  id?: number
  derpartment_id: number
  category_id: number
  created_by: number
  title: string
  slug: string
  description: string
  price: number
  quantity: number
  status: VendorProductStatusEnum
}
