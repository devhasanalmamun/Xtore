interface IHeroImage {
  image: string
  title: string
}

interface ILandingCategory {
  id: string
  name: string
  slug: string
  image?: string
  products_count?: number
}

interface ILandingProductOverview {
  id: string
  title: string
  slug: string
  description: string
  price: number
  discount_percentage: number
  quantity: number
  status: string
  thumbnail_image: string
}

export { IHeroImage, ILandingCategory, ILandingProductOverview }
