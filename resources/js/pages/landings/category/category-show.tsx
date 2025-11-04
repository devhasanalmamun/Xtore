import { SlidersHorizontalIcon } from 'lucide-react'
import { Link } from '@inertiajs/react'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import CategoryTreeNode from '@/pages/landings/category/partials/category-tree-node'
import LandingsLayout from '@/layouts/landings/landings-layout'
import { ILandingProductIndex } from '@/types/landing-product'
import { ICategoryNode } from '@/types/landing-category'
import CardProduct from '@/components/card/card-product'
import { buildCategoryTree } from '@/lib/utils'

interface IProps {
  products: ILandingProductIndex[]
  categories: ICategoryNode[]
}

export default function CategoryShow(props: IProps) {
  const category_tree = buildCategoryTree(props.categories)

  return (
    <LandingsLayout title="Categories" description="This is the categories page">
      <section className="relative px-4 py-8 sm:px-6 lg:py-16 xl:px-8">
        <div className="sm:grid sm:grid-cols-12">
          <div className="hidden border-r lg:col-span-2 lg:block">
            <Link href={route('categories.index')} className="mb-3 inline-block text-lg font-semibold">
              All Categories
            </Link>
            <ul className="space-y-4">
              {category_tree.map((root_node) => (
                <CategoryTreeNode key={root_node.id} node={root_node} />
              ))}
            </ul>
          </div>

          <div className="col-span-12 px-0 lg:col-span-10 lg:px-4">
            <div className="mx-auto mb-4 flex max-w-7xl items-center justify-between gap-1 lg:mb-8">
              <h1 className="font-mono text-2xl font-semibold lg:text-3xl xl:text-4xl">Shop By All Categories</h1>

              <p>Future Sort Filter</p>

              <div className="lg:hidden">
                <Drawer direction="right">
                  <DrawerTrigger asChild>
                    <SlidersHorizontalIcon />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="mb-6">
                      <DrawerTitle>All Categories</DrawerTitle>
                      <DrawerDescription>Browse Categories to find more accurate product.</DrawerDescription>
                    </DrawerHeader>

                    <ul className="-ml-1 space-y-4 overflow-y-auto pb-8">
                      {category_tree.map((root_node) => (
                        <CategoryTreeNode key={root_node.id} node={root_node} />
                      ))}
                    </ul>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>

            <div className="mx-auto max-w-xs space-y-4 overflow-hidden sm:grid sm:max-w-7xl sm:grid-cols-3 sm:gap-2.5 sm:space-y-0 md:grid-cols-4 xl:grid-cols-4">
              {props.products.length > 0 &&
                props.products.map((product) => <CardProduct key={product.id} product={product} />)}

              {props.products.length === 0 && (
                <p className="col-span-12 text-lg font-medium text-red-400">No Product found on this category</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </LandingsLayout>
  )
}
