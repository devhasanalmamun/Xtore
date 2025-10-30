import { Link } from '@inertiajs/react'
import { route } from 'ziggy-js'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ICategoryNode } from '@/types/landing-category'
import { Button } from '@/components/ui/button'

interface IProps {
  node: ICategoryNode
}

export default function CategoryTreeNode(props: IProps) {
  const has_children = props.node.children && props.node.children.length > 0

  if (!has_children) {
    return (
      <li className="cursor-pointer text-sm hover:underline">
        <Link className="pl-1 font-medium" href={route('categories.show', props.node.slug)}>
          {props.node.name}
        </Link>
      </li>
    )
  }

  return (
    <Accordion type="multiple" className="ml-1">
      <AccordionItem value={`category-${props.node.id}`}>
        <AccordionTrigger className="hover:underline">
          <Button
            variant="ghost"
            className="h-fit p-0 hover:bg-transparent"
            onClick={(e) => e.stopPropagation()}
            asChild
          >
            <Link href={route('categories.show', props.node.slug)}>{props.node.name}</Link>
          </Button>
        </AccordionTrigger>
        <AccordionContent className="ml-2 cursor-pointer pb-0">
          <ul className="mt-0.5 space-y-0.5">
            {props.node.children.map((child) => (
              <CategoryTreeNode key={child.id} node={child} />
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
