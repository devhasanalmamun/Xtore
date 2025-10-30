import { SlidersHorizontalIcon } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { route } from 'ziggy-js'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ILandingCategoryIndex } from '@/types/landing-category-index'
import LandingsLayout from '@/layouts/landings/landings-layout'
import CardCategory from '@/components/card/card-category'
import { buildCategoryTree } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface IProps {
  categories: ILandingCategoryIndex[]
}
export default function CategoryIndex(props: IProps) {
  const category_tree = buildCategoryTree(props.categories)

  return (
    <LandingsLayout title="Categories" description="This is the categories page">
      <section className="relative px-4 py-8 sm:px-6 lg:py-16 xl:px-8">
        <div className="grid grid-cols-12">
          <div className="hidden border-r lg:col-span-2 lg:block">
            <p className="mb-3 text-lg font-semibold">All Categories</p>
            <ul className="space-y-4">
              {category_tree.map((root_node) => (
                <CategoryNode key={root_node.id} node={root_node} />
              ))}
            </ul>
          </div>
          <div className="col-span-12 mx-auto max-w-7xl px-0 lg:col-span-10 lg:px-4">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h1 className="font-mono text-2xl font-semibold lg:mb-8 lg:text-3xl xl:text-4xl">
                Shop By All Categories
              </h1>
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
                        <CategoryNode key={root_node.id} node={root_node} />
                      ))}
                    </ul>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {props.categories.map((category) => (
                <CardCategory key={category.id} category={category} className="border" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </LandingsLayout>
  )
}

interface ICategoryNode extends ILandingCategoryIndex {
  children: ICategoryNode[]
}

interface ICategoryNodeProps {
  node: ICategoryNode
}

function CategoryNode({ node }: ICategoryNodeProps) {
  const has_children = node.children && node.children.length > 0

  if (!has_children) {
    return (
      <li className="cursor-pointer text-sm hover:underline">
        <Link className="pl-1 font-medium" href={route('categories.show', node.slug)}>
          {node.name}
        </Link>
      </li>
    )
  }

  return (
    <Accordion type="multiple" className="ml-1">
      <AccordionItem value={`category-${node.id}`}>
        <AccordionTrigger className="hover:underline">
          <Button
            variant="ghost"
            className="h-fit p-0 hover:bg-transparent"
            onClick={(e) => e.stopPropagation()}
            asChild
          >
            <Link href={route('categories.show', node.slug)}>{node.name}</Link>
          </Button>
        </AccordionTrigger>
        <AccordionContent className="ml-2 cursor-pointer pb-0">
          <ul className="mt-0.5 space-y-0.5">
            {node.children.map((child) => (
              <CategoryNode key={child.id} node={child} />
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
