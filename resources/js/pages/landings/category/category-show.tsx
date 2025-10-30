import { SlidersHorizontalIcon } from 'lucide-react'

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

interface IProps {
  products: ILandingProductIndex[]
  category_tree: ICategoryNode[]
}

export default function CategoryShow(props: IProps) {
  return (
    <LandingsLayout title="Categories" description="This is the categories page">
      <section className="relative px-4 py-8 sm:px-6 lg:py-16 xl:px-8">
        <div className="grid grid-cols-12">
          {props.category_tree && (
            <div className="hidden border-r lg:col-span-2 lg:block">
              <p className="mb-3 text-lg font-semibold">All Categories</p>
              <ul className="space-y-4">
                {props.category_tree.map((root_node) => (
                  <CategoryTreeNode key={root_node.id} node={root_node} />
                ))}
              </ul>
            </div>
          )}
          <div className="col-span-12 mx-auto max-w-7xl px-0 lg:col-span-10 lg:px-4">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h1 className="font-mono text-2xl font-semibold lg:mb-8 lg:text-3xl xl:text-4xl">
                Shop By All Categories
              </h1>
              {props.category_tree && (
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
                        {props.category_tree.map((root_node) => (
                          <CategoryTreeNode key={root_node.id} node={root_node} />
                        ))}
                      </ul>
                    </DrawerContent>
                  </Drawer>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-2.5 overflow-hidden sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {props.products.map((product) => (
                <CardProduct key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </LandingsLayout>
  )
}
