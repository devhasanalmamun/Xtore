export interface ILandingCategory {
  id: number
  image: string
  name: string
  slug: string
  parent_id: string | null
}

export interface ICategoryNode extends ILandingCategory {
  children: ICategoryNode[]
}
