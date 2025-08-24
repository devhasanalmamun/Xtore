export interface IAdminCategory {
  department_id: number
  parent_id?: number
  meta_title: string
  meta_description: string
  name: string
  slug: string
  active: boolean
  created_at?: string
}
