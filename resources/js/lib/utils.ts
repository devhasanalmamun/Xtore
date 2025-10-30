import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ICategoryNode, ILandingCategory } from '@/types/landing-category'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cartesianProduct<T>(...arrays: T[][]): T[][] {
  if (arrays.length === 0) return []
  return arrays.reduce<T[][]>((acc, cur) => acc.flatMap((a) => cur.map((b) => [...a, b])), [[]])
}

export function buildCategoryTree(categories: ILandingCategory[]) {
  // Init map with all categories
  const map: Record<number, ICategoryNode> = {}
  categories.forEach((cat) => (map[cat.id] = { ...cat, children: [] }))

  // Build tree
  const roots: ICategoryNode[] = []
  categories.forEach((cat) => {
    if (cat.parent_id !== null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      map[cat.parent_id]?.children.push(map[cat.id])
    } else {
      roots.push(map[cat.id])
    }
  })

  return roots
}
