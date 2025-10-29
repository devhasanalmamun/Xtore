import { Link } from '@inertiajs/react'
import { route } from 'ziggy-js'

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
      <section className="relative px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-6">
          <div className="col-span-1 border-r">
            <p className="mb-3 text-lg font-semibold">All Categories</p>
            <ul className="space-y-4">
              {category_tree.map((root_node) => (
                <CategoryNode key={root_node.id} node={root_node} />
              ))}
            </ul>
          </div>
          <div className="col-span-5">
            <h1 className="mb-8 text-center font-mono text-4xl font-semibold">Shop By All Categories</h1>

            <div className="grid grid-cols-6 gap-2.5 px-4">
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
